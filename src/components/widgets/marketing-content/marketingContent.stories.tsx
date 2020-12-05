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
import * as React from "react";

import { storiesOf } from "@storybook/react";

import {
  withKnobs,
  text,
  radios,
  boolean,
  number,
} from "@storybook/addon-knobs";

import { knobs } from "./marketingContentStoryKnobs";
import MarketingContent from "./MarketingContent";
import MarketingContentText from "./MarketingContentText";
import MarketingContentButton from "./MarketingContentButton";
import MarketingContentMedia from "./MarketingContentMedia";

const textContent = `<h4 class="MuiTypography-root MuiTypography-overline">Use Promo Code: LIGHTING15</h4><p class="MuiTypography-root MuiTypography-h4 bottom-margin-1">Receive 15% Off Lighting orders over $2000</p>`;

storiesOf("Widgets/Marketing", module).add("Marketing Content Example", () => {
  return (
    <MarketingContent
      useMediaBackground={false}
      alignment="center"
      textAlignment="left"
      textComponent={<MarketingContentText content={textContent} />}
      buttonComponent={
        <MarketingContentButton
          url="https://unsplash.com/photos/BlIhVfXbi9s"
          text="Photo Credits"
          appearance="secondary"
        />
      }
      mediaComponent={
        <MarketingContentMedia
          media="image"
          source="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        />
      }
      containerStyles={{
        textColumns: 6,
        textAlignment: "left",
        borderRadius: 6,
        dropShadow: true,
        padding: {
          desktop: 40,
          tablet: 30,
          mobile: 20,
        },
        height: {
          desktop: 400,
          tablet: 350,
          mobile: 200,
        },
      }}
    />
  );
});

storiesOf("Widgets/Marketing", module).add(
  "Marketing Video Content Example",
  () => {
    return (
      <MarketingContent
        useMediaBackground={false}
        alignment="center"
        textAlignment="left"
        textComponent={<MarketingContentText content={textContent} />}
        buttonComponent={
          <MarketingContentButton
            url="https://unsplash.com/photos/BlIhVfXbi9s"
            text="Photo Credits"
            appearance="secondary"
          />
        }
        mediaComponent={
          <MarketingContentMedia
            media="video"
            source="http://clips.vorwaerts-gmbh.de/VfE_html5.mp4"
            poster="https://images.unsplash.com/photo-01604917538193-34a3111252f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
            title=""
            autoPlay={true}
            muted
          />
        }
        containerStyles={{
          textColumns: 6,
          textAlignment: "left",
          borderRadius: 6,
          dropShadow: true,
          padding: {
            desktop: 40,
            tablet: 30,
            mobile: 20,
          },
          height: {
            desktop: 400,
            tablet: 350,
            mobile: 200,
          },
        }}
      />
    );
  }
);

storiesOf("Widgets/Marketing", module)
  .addDecorator(withKnobs)
  .add("Marketing Content: Dynamic Values", () => {
    return (
      <MarketingContent
        useMediaBackground={boolean(
          knobs.image.imageUsage.label,
          knobs.image.imageUsage.default,
          knobs.image.groupId
        )}
        alignment={radios(
          knobs.general.alignment.label,
          knobs.general.alignment.options,
          knobs.general.alignment.default,
          knobs.general.groupId
        )}
        textAlignment={radios(
          knobs.general.textAlignment.label,
          knobs.general.textAlignment.options,
          knobs.general.textAlignment.default,
          knobs.text.groupId
        )}
        textComponent={
          <MarketingContentText
            content={text(
              knobs.text.content.label,
              knobs.text.content.default,
              knobs.text.groupId
            )}
          />
        }
        buttonComponent={
          <MarketingContentButton
            url={text(
              knobs.button.url.label,
              knobs.button.url.default,
              knobs.button.groupId
            )}
            text={text(
              knobs.button.text.label,
              knobs.button.text.default,
              knobs.button.groupId
            )}
            appearance={radios(
              knobs.button.style.label,
              knobs.button.style.options,
              knobs.button.style.default,
              knobs.button.groupId
            )}
          />
        }
        mediaComponent={
          <MarketingContentMedia
            media={radios(
              knobs.general.media.label,
              knobs.general.media.options,
              knobs.general.media.default,
              knobs.general.groupId
            )}
            source={text(
              knobs.image.url.label,
              knobs.image.url.default,
              knobs.image.groupId
            )}
          />
        }
        containerStyles={{
          textElementColumns: number(
            knobs.general.textColumns.label,
            knobs.general.textColumns.default,
            knobs.general.textColumns.options,
            knobs.text.groupId
          ),
          layoutDirection: radios(
            knobs.general.direction.label,
            knobs.general.direction.options,
            knobs.general.direction.default,
            knobs.general.groupId
          ),
          borderRadius: number(
            knobs.general.borderRadius.label,
            knobs.general.borderRadius.default,
            knobs.general.borderRadius.options,
            knobs.general.groupId
          ),
          dropShadow: boolean(
            knobs.general.dropShadow.label,
            knobs.general.dropShadow.default,
            knobs.general.groupId
          ),
          padding: {
            desktop: number(
              knobs.general.padding.desktop.label,
              knobs.general.padding.desktop.default,
              knobs.general.padding.desktop.options,
              knobs.text.groupId
            ),
            tablet: number(
              knobs.general.padding.tablet.label,
              knobs.general.padding.tablet.default,
              knobs.general.padding.tablet.options,
              knobs.text.groupId
            ),
            mobile: number(
              knobs.general.padding.mobile.label,
              knobs.general.padding.mobile.default,
              knobs.general.padding.mobile.options,
              knobs.text.groupId
            ),
          },
          height: {
            desktop: number(
              knobs.general.height.desktop.label,
              knobs.general.height.desktop.default,
              knobs.general.height.desktop.options,
              "Height"
            ),
            tablet: number(
              knobs.general.height.tablet.label,
              knobs.general.height.tablet.default,
              knobs.general.height.tablet.options,
              "Height"
            ),
            mobile: number(
              knobs.general.height.mobile.label,
              knobs.general.height.mobile.default,
              knobs.general.height.mobile.options,
              "Height"
            ),
          },
        }}
      />
    );
  });
