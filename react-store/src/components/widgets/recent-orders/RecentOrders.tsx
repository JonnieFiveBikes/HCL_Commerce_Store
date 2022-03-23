/**
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020
 *
 *==================================================
 */
//Standard libraries
import { useMemo } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
//Foundation libraries
import { useSite } from "../../../_foundation/hooks/useSite";
import * as ROUTES from "../../../constants/routes";
//Custom libraries
//UI
import {
  StyledButton,
  StyledGrid,
  StyledPaper,
  StyledProgressPlaceholder,
  StyledTypography,
} from "@hcl-commerce-store-sdk/react-component";
import { OrderHistoryTable } from "../order-history-table";

const RecentOrders = (props) => {
  const { loading } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mySite } = useSite();
  const tableProps = useMemo(
    () => ({
      from: mySite.isB2B ? ROUTES.DASHBOARD : ROUTES.ACCOUNT,
      noPagination: true,
      noActions: true,
      outerClassName: "vertical-padding-1 horizontal-padding-1",
      pgSz: 2,
      actionsKey: "recentActions",
    }),
    [mySite]
  );

  return loading ? (
    <StyledProgressPlaceholder className="top-margin-2" />
  ) : (
    <StyledPaper className="top-margin-2 vertical-padding-2 horizontal-padding-2">
      <StyledGrid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        className="bottom-padding-2">
        <StyledGrid item>
          <StyledTypography variant="h5" className="bottom-margin-1">
            {t("MyAccount.RecentOrders")}
          </StyledTypography>
        </StyledGrid>

        <StyledGrid item>
          <StyledButton
            testId="my-account-view-orders"
            onClick={() => navigate(ROUTES.ORDER_HISTORY)}
            size="small"
            color="secondary">
            {t("MyAccount.ViewOrders")}
          </StyledButton>
        </StyledGrid>
      </StyledGrid>
      <OrderHistoryTable {...tableProps} />
    </StyledPaper>
  );
};

export { RecentOrders };
