import { MigrationModule } from "@kontent-ai/cli";
import { ManagementClient } from "@kontent-ai/management-sdk";

const migration: MigrationModule = {
  order: 4,
  run: async (apiClient: ManagementClient) => {
    
    for (const status of data) {
        const itemResponse = await apiClient
            .addContentItem()
            .withData({
                name: status.name,
                codename: status.name.toLowerCase().replaceAll(" ", "_"),
                type: {
                    codename: "status",
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
                    codename: "message",
                  },
                  value: status.message
                }),
                builder.multipleChoiceElement({
                  element: {
                      codename: "severity",
                  },
                  value: [{
                    codename: status.severity
                  }],
                })
            ])
            .toPromise();
    }
  }
};

const data = [
  {
    flight: "FR1001",
    name: "FR1001 boarding",
    message: "This flight is now ready for boarding.",
    severity: "info",
    date: "2023-03-18 10:05:13"
  },
  {
    flight: "FR1001",
    name: "FR1001 delayed",
    message: "Due to unexpected maintenance issues, this flight will be delayed by 45 minutes.",
    severity: "problem",
    date: "2023-03-18 10:25:00"
  },
  {
    flight: "FR1002",
    name: "FR1002 cancelled",
    message: "This flight has been cancelled due to severe weather conditions.",
    severity: "cancellation",
    date: "2023-03-18 09:30:00"
  },
  {
    flight: "FR1003",
    name: "FR1003 gate changed",
    message: "The boarding gate for this flight has changed. Passengers are kindly requested to proceed to gate B27.",
    severity: "info",
    date: "2023-03-18 07:45:00"
  },
  {
    flight: "FR1005",
    name: "FR1005 delayed",
    message: "Due to air traffic congestion, this flight will be delayed by approximately 30 minutes.",
    severity: "problem",
    date: "2023-03-18 13:30:00"
  },
  {
    flight: "FR1006",
    name: "FR1006 delayed",
    message: "This flight has been delayed due to a technical issue. We apologize for any inconvenience caused.",
    severity: "problem",
    date: "2023-03-18 08:30:00"
  },
  {
    flight: "FR1007",
    name: "FR1007 cancelled",
    message: "This flight has been cancelled due to crew availability issues.",
    severity: "cancellation",
    date: "2023-03-18 14:30:00"
  },
  {
    flight: "FR1010",
    name: "FR1010 delayed",
    message: "This flight is experiencing minor delays due to traffic congestion at the destination airport.",
    severity: "problem",
    date: "2023-03-18 16:15:00"
  }
];

export default migration;