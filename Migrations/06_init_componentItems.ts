import { MigrationModule } from "@kontent-ai/cli";
import { ManagementClient } from "@kontent-ai/management-sdk";
import { readFileSync } from 'fs'

const migration: MigrationModule = {
  order: 6,
  run: async (apiClient: ManagementClient) => {
    
    // process destinations
    for (const component of componentData) {

      let assetId = ""

      // handle destinations
      if (component.typeCodename === "destination" || component.typeCodename === "component_hero"){
        // if there's a file, upload it first
        const filename = component.elements.find(e => e.type === "asset")?.value as string ?? ''
        const data = readFileSync('files/' + filename)
        const response = await apiClient.uploadBinaryFile()
          .withData({
            binaryData: data,
            contentLength: data.byteLength,
            contentType: 'image/jpeg',
            filename: filename,
          })
          .toPromise()
        const fileId = response.data.id

        const assetResponse = await apiClient.addAsset()
          .withData((builder) => {
            return {
              file_reference: {
                id: fileId,
                type: 'internal'
              },
              title: component.elements.find(el => el.codename === "title")?.value as string ?? filename,
            }
          })
          .toPromise()
        assetId = assetResponse.data.id
      }
      
      const itemResponse = await apiClient
        .addContentItem()
        .withData({
            name: component.contentItemName,
            codename: component.contentItemName.toLowerCase().replaceAll(" ", "_").replaceAll(",",""),
            type: {
                codename: component.typeCodename,
            },
        })
      .toPromise();

      await apiClient
            .upsertLanguageVariant()
            .byItemId(itemResponse.data.id)
            .byLanguageCodename("default")
            .withData((builder) => component.elements.map(el => {
              switch (el.type){
                case "asset":
                  return builder.assetElement({
                    element: {
                      codename: el.codename
                    },
                    value: [{
                      id: assetId
                    }]
                  })

                case "richtext":
                  return builder.richTextElement({
                    element: {
                      codename: el.codename
                    },
                    value: "<p>" + (el.value as string) + "</p>"
                  })

                case "linkeditems":
                  return builder.linkedItemsElement({
                    element: {
                      codename: el.codename
                    },
                    value: (el.value as string[]).map(e => ({
                      codename: e
                    }))
                  })
                
                // default === text
                default:
                  return builder.textElement({
                    element: {
                      codename: el.codename
                    },
                    value: (el.value as string)
                  })
              }
            }))
            .toPromise();
    }
  }
};

const componentData = [
  {
    typeCodename: "destination",
    contentItemName: 'London',
    elements: [
      { type: "asset", codename: "photo", value: "london.jpg" },
      { type: "text", codename: "title", value: "London" },
      { type: "richtext", codename: "text", value: "London is the capital of England and one of the world's most diverse and cosmopolitan cities, known for its iconic landmarks, rich history, and vibrant cultural scene." }
    ],
  },
  {
    typeCodename: "destination",
    contentItemName: 'San Francisco',
    elements: [
      { type: "asset", codename: "photo", value: "san-francisco.jpg" },
      { type: "text", codename: "title", value: "San Francisco" },
      { type: "richtext", codename: "text", value: "San Francisco is a vibrant city located in northern California, USA, known for its iconic landmarks, hilly terrain, diverse culture, and prominent role as a hub for innovation and technology." }
    ],
  },
  {
    typeCodename: "destination",
    contentItemName: 'Stockholm',
    elements: [
      { type: "asset", codename: "photo", value: "stockholm.jpg" },
      { type: "text", codename: "title", value: "Stockholm" },
      { type: "richtext", codename: "text", value: "Stockholm is the capital of Sweden and a leading tech hub, known for its vibrant startup scene, innovative spirit, and high quality of life." }
    ],
  },
  {
    typeCodename: "hero_card",
    contentItemName: "Our planes, your destinations",
    elements: [
      { type: "text", codename: "title", value: "Our planes, your destinations" },
      { type: "richtext", codename: "text", value: "Embark on your dream journey with our fleet of state-of-the-art planes, taking you to the world's most exciting destinations." }
    ]
  },
  {
    typeCodename: "hero_card",
    contentItemName: "Fly with us, experience comfort",
    elements: [
      { type: "text", codename: "title", value: "Fly with us, experience comfort" },
      { type: "richtext", codename: "text", value: "Experience unparalleled comfort and luxury as you soar through the skies with our world-class amenities and top-notch service." }
    ]
  },
  {
    typeCodename: "hero_card",
    contentItemName: "Safety first, always",
    elements: [
      { type: "text", codename: "title", value: "Safety first, always" },
      { type: "richtext", codename: "text", value: "At KontentAir, your safety is our top priority, and we take every measure to ensure your peace of mind while you travel with us." }
    ]
  },
  {
    typeCodename: "component_hero",
    contentItemName: "Hero",
    elements: [
      { type: "asset", codename: "video", value: "landing.mp4" },
      { type: "linkeditems", codename: "cards", value: ["our_planes_your_destinations", "fly_with_us_experience_comfort", "safety_first_always"] }
    ]
  },
  {
    typeCodename: "component_text_section",
    contentItemName: "Text section",
    elements: [
      { type: "text", codename: "title", value: "Discover the world with KontentAir" },
      { type: "richtext", codename: "text", value: "From breathtaking natural wonders to bustling metropolises, explore the world's most iconic destinations with KontentAir. Enjoy seamless travel and hassle-free planning with our comprehensive booking options and personalized customer service. Join our loyalty program and earn rewards as you jet set across the globe, making every journey with KontentAir even more rewarding." }
    ]
  },
  {
    typeCodename: "component_newsletter_cta",
    contentItemName: "Newsletter CTA",
    elements: []
  },
  {
    typeCodename: "component_listing",
    contentItemName: "Our destinations",
    elements: [
      { type: "text", codename: "title", value: "Our destinations" },
      { type: "linkeditems", codename: "data", value: ["london", "san_francisco", "stockholm"] }
    ]
  }
];

export default migration;