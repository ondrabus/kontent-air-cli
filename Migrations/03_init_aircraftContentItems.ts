import { MigrationModule } from "@kontent-ai/cli";
import { ManagementClient } from "@kontent-ai/management-sdk";

const migration: MigrationModule = {
  order: 3,
  run: async (apiClient: ManagementClient) => {
    
    for (const aircraft of data) {
        const itemResponse = await apiClient
            .addContentItem()
            .withData({
                name: aircraft.name,
                codename: aircraft.code,
                type: {
                    codename: "aircraft",
                },
            })
            .toPromise();

        await apiClient
            .upsertLanguageVariant()
            .byItemId(itemResponse.data.id)
            .byLanguageCodename("default")
            .withData((builder) => [
                builder.textElement({
                element: {
                    codename: "id",
                },
                value: aircraft.name,
                }),
                builder.multipleChoiceElement({
                    element: {
                        codename: "type",                        
                    },
                    value: [{
                        codename: aircraft.type
                    }]
                })
            ])
            .toPromise();
    }
  }
};

const data = [
    {
      name: "EI-DWW",
      code: "eidww",
      type: "b737800"
    },
    {
      name: "EI-DYM",
      code: "eidym",
      type: "b737800"
    },
    {
      name: "EI-DZL",
      code: "eidzl",
      type: "b737800"
    },
    {
      name: "EI-ENT",
      code: "eient",
      type: "b737800"
    },
    {
      name: "EI-EMT",
      code: "eiemt",
      type: "b737800"
    },
    {
      name: "EI-GXW",
      code: "eigxw",
      type: "b737max"
    },
    {
      name: "EI-GYH",
      code: "eigyh",
      type: "b737max"
    },
    {
      name: "EI-GZL",
      code: "eigzl",
      type: "b737max"
    },
    {
      name: "EI-HJT",
      code: "eihjt",
      type: "b737max"
    },
    {
      name: "EI-HKL",
      code: "eihkl",
      type: "b737max"
    }
];

export default migration;