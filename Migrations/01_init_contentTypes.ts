import { MigrationModule } from "@kontent-ai/cli";
import {
  ContentTypeElementsBuilder,
  ContentTypeModels,
  ManagementClient,
} from "@kontent-ai/management-sdk";

const migration: MigrationModule = {
  order: 1,
  run: async (apiClient: ManagementClient) => {
    await apiClient
      .addContentType()
      .withData(BuildAirportTypeData)
      .toPromise();

    await apiClient
      .addContentType()
      .withData(BuildAircraftTypeData)
      .toPromise();

    await apiClient
      .addContentType()
      .withData(BuildStatusTypeData)
      .toPromise();

    await apiClient
      .addContentType()
      .withData(BuildFlightTypeData)
      .toPromise()

    await apiClient
      .addContentType()
      .withData(BuildHeroCardTypeData)
      .toPromise()

    await apiClient
      .addContentType()
      .withData(BuildHeroComponentTypeData)
      .toPromise()

    await apiClient
      .addContentType()
      .withData(BuildTextSectionComponentTypeData)
      .toPromise()

    await apiClient
      .addContentType()
      .withData(BuildNewsletterCTAComponentTypeData)
      .toPromise()

    await apiClient
      .addContentType()
      .withData(BuildDestinationTypeData)
      .toPromise()
      
    await apiClient
      .addContentType()
      .withData(BuildListingTypeData)
      .toPromise()
  },
};

const BuildAirportTypeData = (
  builder: ContentTypeElementsBuilder
): ContentTypeModels.IAddContentTypeData => {
  return {
    name: "Airport",
    codename: "airport",
    elements: [
      builder.textElement({
        name: "Code",
        codename: "code",
        type: "text",
      }),
      builder.textElement({
        name: "Title",
        codename: "title",
        type: "text",
      }),
    ],
  };
};
const BuildAircraftTypeData = (
  builder: ContentTypeElementsBuilder
): ContentTypeModels.IAddContentTypeData => {
  return {
    name: "Aircraft",
    codename: "aircraft",
    elements: [
      builder.textElement({
        name: "ID",
        codename: "id",
        type: "text",
      }),
      builder.multipleChoiceElement({
        name: "Type",
        codename: "type",
        mode: "single",
        type: "multiple_choice",
        options: [
          {
            codename: "b737800",
            name: "B737"
          },
          {
            codename: "b737max",
            name: "B737 MAX"
          }
        ],        
      }),
    ],
  };
};

const BuildStatusTypeData = (
  builder: ContentTypeElementsBuilder
): ContentTypeModels.IAddContentTypeData => {
  return {
    name: "Status",
    codename: "status",
    elements: [
      builder.textElement({
        name: "Message",
        codename: "message",
        type: "text",
      }),
      builder.multipleChoiceElement({
        name: "Severity",
        codename: "severity",
        mode: "single",
        type: "multiple_choice",
        options: [
          {
            "codename": "info",
            "name": "Info"
          },
          {
            "codename": "problem",
            "name": "Problem"
          },
          {
            "codename": "cancellation",
            "name": "Cancellation"
          }
        ],
      }),
    ],
  };
};

const BuildFlightTypeData = (
  builder: ContentTypeElementsBuilder
): ContentTypeModels.IAddContentTypeData => {
  return {
    name: "Flight",
    codename: "flight",
    elements: [
      builder.linkedItemsElement({
        name: "Aircraft",
        codename: "aircraft",
        type: "modular_content",
        item_count_limit: {
          value: 1,
          condition: "exactly",
        },
        allowed_content_types: [{ codename: "aircraft" }],
        is_required: true,
      }),
      builder.linkedItemsElement({
        name: "Origin",
        codename: "origin",
        type: "modular_content",
        item_count_limit: {
          value: 1,
          condition: "exactly"
        },
        allowed_content_types: [{ codename: "airport" }],
        is_required: true,
      }),
      builder.linkedItemsElement({
        name: "Destination",
        codename: "destination",
        type: "modular_content",
        item_count_limit: {
          value: 1,
          condition: "exactly"
        },
        allowed_content_types: [{ codename: "airport" }],
        is_required: true,
      }),
      builder.linkedItemsElement({
        name: "Statuses",
        codename: "statuses",
        type: "modular_content",
        allowed_content_types: [{ codename: "status" }],
      }),
      builder.dateTimeElement({
        name: "Departure",
        codename: "departure",
        type: "date_time",
        is_required: true,
      }),
      builder.dateTimeElement({
        name: "Arrival",
        codename: "arrival",
        type: "date_time",
        is_required: true,
      })
    ],
  };
};

const BuildHeroCardTypeData = (
  builder: ContentTypeElementsBuilder
): ContentTypeModels.IAddContentTypeData => {
  return {
    name: "Hero Card",
    codename: "hero_card",
    elements: [
      builder.textElement({
        name: "Title",
        codename: "title",
        type: "text",
      }),
      builder.richTextElement({
        name: "Text",
        codename: "text",
        type: "rich_text",
        allowed_blocks: ["text"],
      }),
    ]
  }
}

const BuildHeroComponentTypeData = (
  builder: ContentTypeElementsBuilder
): ContentTypeModels.IAddContentTypeData => {
  return {
    name: "[Component] Hero",
    codename: "component_hero",
    elements: [
      builder.assetElement({
        name: "Video",
        codename: "video",
        type: "asset",
        asset_count_limit: {
          value: 1,
          condition: "exactly"
        },
        is_required: true,
      }),
      builder.linkedItemsElement({
        name: "Cards",
        codename: "cards",
        type: "modular_content",
        item_count_limit: {
          value: 1,
          condition: "at_least",
        },
        allowed_content_types: [{ codename: "hero_card" }],
        is_required: true,
      }),
    ],
  };
};

const BuildTextSectionComponentTypeData = (
  builder: ContentTypeElementsBuilder
): ContentTypeModels.IAddContentTypeData => {
  return {
    name: "[Component] Text Section",
    codename: "component_text_section",
    elements: [
      builder.textElement({
        name: "Title",
        codename: "title",
        type: "text",
      }),
      builder.richTextElement({
        name: "Text",
        codename: "text",
        type: "rich_text",
        allowed_blocks: ["text"],
      }),
    ],
  };
};

const BuildNewsletterCTAComponentTypeData = (
  builder: ContentTypeElementsBuilder
): ContentTypeModels.IAddContentTypeData => {
  return {
    name: "[Component] Newsletter CTA",
    codename: "component_newsletter_cta",
    elements: []
  };
};

const BuildDestinationTypeData = (
  builder: ContentTypeElementsBuilder
): ContentTypeModels.IAddContentTypeData => {
  return {
    name: "Destination",
    codename: "destination",
    elements: [
      builder.assetElement({
        name: "Photo",
        codename: "photo",
        type: "asset",
        asset_count_limit: {
          value: 1,
          condition: "exactly"
        },
        allowed_file_types: "adjustable",
        is_required: true,
      }),
      builder.textElement({
        name: "Title",
        codename: "title",
        type: "text",
        is_required: true,
      }),
      builder.richTextElement({
        name: "Text",
        codename: "text",
        type: "rich_text",
        is_required: true,
        allowed_blocks: ["text"],
      }),
    ],
  };
};

const BuildListingTypeData = (
  builder: ContentTypeElementsBuilder
): ContentTypeModels.IAddContentTypeData => {
  return {
    name: "[Component] Listing",
    codename: "component_listing",
    elements: [
      builder.textElement({
        name: "Title",
        codename: "title",
        type: "text",
        is_required: true,
      }),
      builder.linkedItemsElement({
        name: "Data",
        codename: "data",
        type: "modular_content",
        allowed_content_types: [{ codename: "destination" }],
        is_required: true,
      }),
    ],
  };
};

export default migration;
