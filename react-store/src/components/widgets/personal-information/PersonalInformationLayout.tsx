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
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import getDisplayName from "react-display-name";
//Foundation libraries
import { useSite } from "../../../_foundation/hooks/useSite";
//Custom libraries
import { ChangePassword } from "../../widgets/change-password";
import { CountryState } from "../country-state";
import addressUtil from "../../../utils/addressUtil";
//Redux
import { addressDetailsSelector } from "../../../redux/selectors/account";
import * as successActions from "../../../redux/actions/success";
import personService from "../../../_foundation/apis/transaction/person.service";
import { GET_ADDRESS_DETAIL_ACTION } from "../../../redux/actions/account";
//UI
import {
  StyledButton,
  StyledGrid,
  StyledPaper,
  StyledTypography,
  StyledTextField,
} from "@hcl-commerce-store-sdk/react-component";

function PersonalInformationLayout() {
  const widgetName = getDisplayName(PersonalInformationLayout);
  const addressDetails = useSelector(addressDetailsSelector);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const Edit = t("PersonalInformation.Edit");
  const [editView, setEditView] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>(addressDetails?.firstName);
  const [lastName, setLastName] = useState<string>(addressDetails?.lastName);
  const [email, setEmail] = useState<string>(addressDetails?.email1);
  const [phone, setPhone] = useState<string>(addressDetails?.phone1);
  const [addressLine, setAddressLine] = useState<string>(
    addressDetails?.addressLine ? addressDetails?.addressLine[0] : ""
  );
  const [city, setCity] = useState<string>(addressDetails?.city);
  const [country, setCountry] = useState<string>(addressDetails?.country);
  const [state, setState] = useState<string>(addressDetails?.state);
  const [zipCode, setZipCode] = useState<string>(addressDetails?.zipCode);
  const { mySite } = useSite();

  const controller = useMemo(() => new AbortController(), []);
  const payloadBase: any = {
    widget: widgetName,
    signal: controller.signal,
  };
  const cancel = () => {
    setEditView(false);
  };
  const editPI = () => {
    setFirstName(addressDetails?.firstName);
    setLastName(addressDetails?.lastName);
    setEmail(addressDetails?.email1);
    setPhone(addressDetails?.phone1);
    setAddressLine(addressDetails?.addressLine ? addressDetails?.addressLine[0] : "");
    setCity(addressDetails?.city);
    setCountry(addressDetails?.country);
    setState(addressDetails?.state);
    setZipCode(addressDetails?.zipCode);
    setEditView(true);
  };

  const canSave = () => {
    return (
      [email, firstName, lastName, city, country, zipCode, addressLine].every((f) => f?.trim()) &&
      addressUtil.validateEmail(email) &&
      addressUtil.validatePhoneNumber(phone?.trim())
    );
  };

  const save = (props: any) => {
    props.preventDefault();

    const storeID = mySite.storeID;
    const parameters: any = {
      responseFormat: "application/json",
      storeId: storeID,
      body: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email1: email,
        phone1: phone?.trim(),
        city: city.trim(),
        state: state.trim(),
        country: country.trim(),
        addressLine: [addressLine.trim()],
        zipCode: zipCode.trim(),
      },
      ...payloadBase,
    };
    personService
      .updatePerson(parameters)
      .then((res) => {
        if (res.status === 200) {
          const successMessage = {
            key: "PersonalInformation.UpdateSuccessful",
          };
          dispatch(successActions.HANDLE_SUCCESS_MESSAGE_ACTION(successMessage));
          dispatch(GET_ADDRESS_DETAIL_ACTION(payloadBase));
          setEditView(false);
        }
      })
      .catch((err) => {
        return;
      });
  };
  useEffect(() => {
    if (mySite) {
      dispatch(GET_ADDRESS_DETAIL_ACTION(payloadBase));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mySite]);

  useEffect(() => {
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledPaper className="vertical-padding-2 horizontal-padding-2">
      <StyledGrid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        className="bottom-padding-2">
        <StyledGrid item>
          <StyledTypography variant="h5" className="bottom-margin-1">
            {t("MyAccount.PersonalInformation")}
          </StyledTypography>
        </StyledGrid>
        {editView ? (
          <StyledGrid item style={{ display: "flex", flexWrap: "wrap" }}>
            <StyledButton
              testId="personal-information-cancel-edit"
              color="secondary"
              size="small"
              onClick={cancel}
              className="right-margin-2 bottom-margin-1">
              {t("PersonalInformation.Cancel")}
            </StyledButton>
            <StyledButton
              testId="personal-information-save-edit"
              color="primary"
              size="small"
              className="bottom-margin-1"
              onClick={save}
              disabled={!canSave()}>
              {t("PersonalInformation.SaveChanges")}
            </StyledButton>
          </StyledGrid>
        ) : (
          <StyledGrid item style={{ display: "flex", flexWrap: "wrap" }}>
            <StyledButton
              testId="edit-personal-info"
              onClick={editPI}
              size="small"
              color="secondary"
              className="right-margin-2 bottom-margin-1">
              {Edit}
            </StyledButton>
            <ChangePassword />
          </StyledGrid>
        )}
      </StyledGrid>

      <StyledGrid container spacing={4}>
        <StyledGrid item xs={12} sm={6} md={4}>
          <StyledTypography variant="subtitle2">{t("MyAccount.ContactInformation")}</StyledTypography>
          {editView ? (
            <>
              <StyledTextField
                margin="normal"
                required
                fullWidth
                label={t("RegistrationLayout.FirstName")}
                name="firstName"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                inputProps={{
                  maxLength: 40,
                }}
              />

              <StyledTextField
                margin="normal"
                required
                fullWidth
                label={t("RegistrationLayout.LastName")}
                name="lastName"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                inputProps={{
                  maxLength: 40,
                }}
              />

              <StyledTextField
                margin="normal"
                required
                fullWidth
                label={t("RegistrationLayout.Email")}
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                inputProps={{
                  maxLength: 100,
                  type: "email",
                  placeholder: "name@domain.com",
                }}
                error={!addressUtil.validateEmail(email)}
                helperText={!addressUtil.validateEmail(email) ? t("RegistrationLayout.Msgs.InvalidFormat") : ""}
              />

              <StyledTextField
                margin="normal"
                fullWidth
                label={t("RegistrationLayout.Phone")}
                name="phone"
                autoComplete="phone"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                inputProps={{
                  maxLength: 32,
                  type: "tel",
                }}
                error={!addressUtil.validatePhoneNumber(phone)}
                helperText={!addressUtil.validatePhoneNumber(phone) ? t("RegistrationLayout.Msgs.InvalidFormat") : ""}
              />
            </>
          ) : (
            <StyledTypography variant="body1" className="bottom-margin-1" component="div">
              {[addressDetails?.email1, addressDetails?.phone1].map(
                (item: string, index: number) =>
                  item && (
                    <StyledTypography variant="body1" component="div" key={item}>
                      {item}
                    </StyledTypography>
                  )
              )}
            </StyledTypography>
          )}
        </StyledGrid>
        <StyledGrid item xs={12} sm={6} md={4}>
          <StyledTypography variant="subtitle2">{t("MyAccount.AccountAddress")}</StyledTypography>
          {editView ? (
            <>
              <StyledTextField
                margin="normal"
                required
                name="addressLine1"
                label={t("AddressForm.Labels.Address1")}
                onChange={(e) => setAddressLine(e.target.value)}
                value={addressLine}
                inputProps={{ maxLength: 99 }}
                fullWidth
                autoComplete="address-line1"
              />
              <StyledGrid container spacing={2}>
                <StyledGrid item xs={12}>
                  <StyledTextField
                    margin="normal"
                    required
                    name="city"
                    label={t("AddressForm.Labels.City")}
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                    inputProps={{ maxLength: 40 }}
                    fullWidth
                    autoComplete="city"
                  />
                </StyledGrid>
              </StyledGrid>
              <StyledGrid className="top-margin-1" container spacing={2}>
                <CountryState
                  country={country}
                  setCountry={setCountry}
                  state={state}
                  setState={setState}
                  grids={[{ xs: 12 }, { xs: 12 }]}
                />
              </StyledGrid>
              <StyledTextField
                margin="normal"
                required
                name="zipCode"
                label={t("AddressForm.Labels.ZipCode")}
                onChange={(e) => setZipCode(e.target.value)}
                value={zipCode}
                inputProps={{ maxLength: 30 }}
                fullWidth
                autoComplete="zipCode"
              />
            </>
          ) : (
            <>
              {addressDetails?.addressLine ||
              addressDetails?.state ||
              addressDetails?.city ||
              addressDetails?.country ||
              addressDetails?.zipCode ? (
                <StyledTypography variant="body1" className="bottom-margin-1" component="div">
                  <StyledTypography variant="body1" component="div">
                    {(addressDetails?.addressLine ?? [""])[0] ?? ""}
                  </StyledTypography>
                  <StyledTypography variant="body1" component="div">
                    {addressDetails?.city ? `${addressDetails.city}, ` : ""}
                    {addressDetails?.state ? `${addressDetails.state}, ` : ""}
                    {addressDetails?.country ?? ""}
                  </StyledTypography>
                  <StyledTypography variant="body1" component="div">
                    {addressDetails?.zipCode ?? ""}
                  </StyledTypography>
                </StyledTypography>
              ) : (
                <StyledTypography variant="body1" className="bottom-margin-1" component="div">
                  {t("MyAccount.NoAccountAddress")}
                </StyledTypography>
              )}
            </>
          )}
        </StyledGrid>
      </StyledGrid>
    </StyledPaper>
  );
}

export { PersonalInformationLayout };
