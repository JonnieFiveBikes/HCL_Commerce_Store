/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2022
 *
 *==================================================
 */
//Standard libraries
import { useTranslation } from "react-i18next";
//UI
import { StyledGrid, StyledPaper, StyledButton } from "@hcl-commerce-store-sdk/react-component";
import { Divider } from "@mui/material";
import { StoreLocatorWidget } from "../../../widgets/store-locator-widget";
//Custom libraries
import { useStoreLocatorValue } from "../../../../_foundation/context/store-locator-context";
import { withOutletContext } from "../stepper-guard";
import usePickup from "../../../../_foundation/hooks/use-pickup";

const PickupStore = () => {
  const { t } = useTranslation();
  const { storeLocator } = useStoreLocatorValue();
  const { ContinuePickupDetails } = usePickup();

  const checkStoreSelected = () => {
    if (storeLocator?.selectedStore) {
      return true;
    }
    return false;
  };

  return (
    <StyledPaper className="vertical-padding-2 horizontal-padding-2">
      <StyledGrid container direction="column" justifyContent="center" alignItems="stretch">
        <StyledGrid item>
          <StoreLocatorWidget />
        </StyledGrid>
        <Divider className="vertical-margin-2" />
        <StyledGrid container alignItems="center" justifyContent="flex-end" spacing={2}>
          <StyledGrid item>
            <StyledButton
              testId="pickup-order-checkout"
              color="primary"
              disabled={!checkStoreSelected()}
              onClick={ContinuePickupDetails}>
              {t("Pickup.ContinuePickupDetails")}
            </StyledButton>
          </StyledGrid>
        </StyledGrid>
      </StyledGrid>
    </StyledPaper>
  );
};

export default withOutletContext(PickupStore);
