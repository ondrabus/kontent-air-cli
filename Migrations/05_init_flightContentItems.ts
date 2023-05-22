import { MigrationModule } from "@kontent-ai/cli";
import { ManagementClient } from "@kontent-ai/management-sdk";

const migration: MigrationModule = {
  order: 5,
  run: async (apiClient: ManagementClient) => {
    
    for (const flight of data) {
        const itemResponse = await apiClient
            .addContentItem()
            .withData({
                name: flight.id,
                codename: flight.id.toLowerCase(),
                type: {
                    codename: "flight",
                },
            })
            .toPromise();

        await apiClient
            .upsertLanguageVariant()
            .byItemId(itemResponse.data.id)
            .byLanguageCodename("default")
            .withData((builder) => [
                builder.linkedItemsElement({
                  element: {
                      codename: "aircraft",
                  },
                  value: [{
                    codename: flight.aircraft
                  }],
                }),
                builder.linkedItemsElement({
                  element: {
                    codename: "origin"
                  },
                  value: [{
                    codename: flight.origin.toLowerCase()
                  }]
                }),
                builder.linkedItemsElement({
                  element: {
                    codename: "destination"
                  },
                  value: [{
                    codename: flight.destination.toLowerCase()
                  }]
                }),
                builder.dateTimeElement({
                  element: {
                    codename: "departure"
                  },
                  value: flight.departure
                }),
                builder.dateTimeElement({
                  element: {
                    codename: "arrival"
                  },
                  value: flight.arrival
                }),
                builder.linkedItemsElement({
                  element: {
                    codename: "statuses"
                  },
                  value: 
                    flight.statuses.map(s => ({
                      codename: s.toLowerCase().replaceAll(" ", "_")
                    }))
                })
            ])
            .toPromise();
    }
  }
};

const data = [
  {
    id: "FR1001",
    aircraft: "eidzl",
    origin: "ATH",
    destination: "LIS",
    departure: "2023-03-18 10:30:00",
    arrival: "2023-03-18 14:15:00",
    statuses: ["FR1001 boarding", "FR1001 delayed"]
  },
  {
    id: "FR1002",
    aircraft: "eiemt",
    origin: "DUB",
    destination: "CDG",
    departure: "2023-03-18 09:45:00",
    arrival: "2023-03-18 12:45:00",
    statuses: ["FR1002 cancelled"]
  },
  {
    id: "FR1003",
    aircraft: "eihjt",
    origin: "BCN",
    destination: "AMS",
    departure: "2023-03-18 08:15:00",
    arrival: "2023-03-18 11:15:00",
    statuses: ["FR1003 gate changed"]
  },
  {
    id: "FR1004",
    aircraft: "eigxw",
    origin: "ARN",
    destination: "FCO",
    departure: "2023-03-18 11:00:00",
    arrival: "2023-03-18 14:30:00",
    statuses: []
  },
  {
    id: "FR1005",
    aircraft: "eient",
    origin: "CDG",
    destination: "ZRH",
    departure: "2023-03-18 13:45:00",
    arrival: "2023-03-18 16:45:00",
    statuses: ["FR1005 delayed"]
  },
  {
    id: "FR1006",
    aircraft: "eihkl",
    origin: "GDN",
    destination: "ATH",
    departure: "2023-03-18 09:00:00",
    arrival: "2023-03-18 12:00:00",
    statuses: ["FR1006 delayed"]
  },
  {
    id: "FR1007",
    aircraft: "eigyh",
    origin: "LIS",
    destination: "CPH",
    departure: "2023-03-18 15:30:00",
    arrival: "2023-03-18 18:00:00",
    statuses: ["FR1007 cancelled"]
  },
  {
    id: "FR1008",
    aircraft: "eigzl",
    origin: "MAD",
    destination: "BRQ",
    departure: "2023-03-18 12:00:00",
    arrival: "2023-03-18 15:00:00",
    statuses: []
  },
  {
    id: "FR1009",
    aircraft: "eidww",
    origin: "ZRH",
    destination: "DUB",
    departure: "2023-03-18 14:00:00",
    arrival: "2023-03-18 16:30:00",
    statuses: []
  },
  {
    id: "FR1010",
    aircraft: "eidww",
    origin: "FRA",
    destination: "VIE",
    departure: "2023-03-18 16:00:00",
    arrival: "2023-03-18 17:30:00",
    statuses: ["FR1010 delayed"]
  }
];

export default migration;