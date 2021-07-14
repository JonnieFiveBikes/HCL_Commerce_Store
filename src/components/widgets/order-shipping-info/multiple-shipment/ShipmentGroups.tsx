/*
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
import React from "react";
import { useTranslation } from "react-i18next";
//Custom libraries
import { AddressCard } from "../../address-card";
import { OrderItemTable } from "../../order-item-table";
//UI
import {
  StyledAccordion,
  StyledAccordionSummary,
  StyledAccordionDetails,
  StyledGrid,
  StyledTypography,
  StyledIconLabel,
  StyledBox,
  StyledButton,
} from "@hcl-commerce-store-sdk/react-component";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ListIcon from "@material-ui/icons/List";
import OrderDetailSubsection from "../../order-detail-subsection/OrderDetailSubsection";

interface ShipmentGroupSummaryProps {
  index: number;
  group: any;
}
const ShippingGroupSummary = ({ index, group }: ShipmentGroupSummaryProps) => {
  const { t } = useTranslation();
  const item = group[0];
  return (
    <StyledBox
      display="flex"
      flexDirection="row"
      alignItems="flex-start"
      flexWrap="wrap">
      <StyledIconLabel
        icon={<ListIcon color="primary" />}
        label={t("OrderShippingInfo.Labels.ShipmentGroup", {
          index: `${index + 1}`,
        })}
      />
      <StyledBox mr={3} my={1}>
        <StyledTypography
          variant="body2"
          display="block"
          className="shipment-group-heading">
          {t("OrderShippingInfo.Labels.ShipMethod")}
        </StyledTypography>
        <StyledTypography variant="body1" display="block">
          {item.shipModeDescription}
        </StyledTypography>
      </StyledBox>
      <StyledBox mr={3} my={1}>
        <StyledTypography
          variant="body2"
          display="block"
          className="shipment-group-heading">
          {t("OrderShippingInfo.Labels.ShipAddress")}
        </StyledTypography>
        <StyledBox className="accordion-show-expanded">
          <AddressCard
            addressId={item.addressId}
            addressData={item}
            readOnly={true}
          />
        </StyledBox>
        <StyledBox className="accordion-show-summary">
          <StyledTypography variant="body1">
            {item.addressLine[0]}
          </StyledTypography>
        </StyledBox>
      </StyledBox>
    </StyledBox>
  );
};

export interface ShipmentGroupsProps {
  groups: any[];
}

const ShipmentGroups: React.FC<ShipmentGroupsProps> = (
  props: ShipmentGroupsProps
) => {
  const { t } = useTranslation();
  const { groups } = props;
  return (
    <StyledGrid item xs={12}>
      <OrderDetailSubsection
        heading={
          <StyledTypography variant="h4" gutterBottom>
            {t("OrderShippingInfo.Labels.ShippingDetails")}
          </StyledTypography>
        }
        details={
          <>
            {groups.map((group, index) => (
              <StyledAccordion key={index} className="shipment-group">
                <StyledAccordionSummary
                  className="shipment-group-summary"
                  expandIcon={
                    <>
                      <StyledButton
                        variant="text"
                        color="primary"
                        size="small"
                        component="div"
                        className="accordion-show-summary horizontal-padding-1">
                        <StyledTypography variant="body1">
                          {t("OrderShippingInfo.Labels.ShowGroupDetails")}
                        </StyledTypography>
                      </StyledButton>
                      <ExpandMoreIcon />
                      <StyledButton
                        variant="text"
                        color="primary"
                        size="small"
                        component="div"
                        className="accordion-show-expanded horizontal-padding-1">
                        <StyledTypography variant="body1">
                          {t("OrderShippingInfo.Labels.HideGroupDetails")}
                        </StyledTypography>
                      </StyledButton>
                    </>
                  }
                  aria-label={t("OrderShippingInfo.Labels.ShipmentGroup", {
                    index: `${index + 1}`,
                  })}
                  aria-controls={`group-${index}-details`}
                  id={`group-${index}-heading`}>
                  <ShippingGroupSummary
                    {...{ group, index }}></ShippingGroupSummary>
                </StyledAccordionSummary>
                <StyledAccordionDetails
                  id={`group-${index}-details`}
                  className="shipment-group-details">
                  <OrderItemTable
                    data={group}
                    readOnly={true}
                    className="review-order full-width"
                  />
                </StyledAccordionDetails>
              </StyledAccordion>
            ))}
          </>
        }></OrderDetailSubsection>
    </StyledGrid>
  );
};

export default ShipmentGroups;
