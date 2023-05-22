import { MigrationModule } from "@kontent-ai/cli";
import { ManagementClient } from "@kontent-ai/management-sdk";

const migration: MigrationModule = {
  order: 2,
  run: async (apiClient: ManagementClient) => {
    
    for (const airport of data) {
        const itemResponse = await apiClient
        .addContentItem()
        .withData({
            name: airport.name,
            codename: airport.code.toLowerCase(),
            type: {
                codename: "airport",
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
                codename: "code",
            },
            value: airport.code,
            }),
            builder.textElement({
            element: {
                codename: "title",
            },
            value: airport.title,
            }),
        ])
        .toPromise();
    }
  }
};

const data = [{
    name: "Brno",
    code: "BRQ",
    title: "Brno, CZ",
},
{
    name: "London Heathrow",
    code: "LHR",
    title: "London Heathrow, UK"
},
{
    name: "Paris Charles de Gaulle",
    code: "CDG",
    title: "Paris Charles de Gaulle, FR"
},
{
    name: "Rome Fiumicino",
    code: "FCO",
    title: "Rome Fiumicino, IT"
},
{
    name: "Amsterdam Schiphol",
    code: "AMS",
    title: "Amsterdam Schiphol, NL"
},
{
    name: "Frankfurt",
    code: "FRA",
    title: "Frankfurt, DE"
},
{
    name: "Barcelona",
    code: "BCN",
    title: "Barcelona, ES"
},
{
    name: "Madrid Adolfo Suárez Madrid-Barajas",
    code: "MAD",
    title: "Madrid Adolfo Suárez Madrid-Barajas, ES"
},
{
    name: "Athens International",
    code: "ATH",
    title: "Athens International, GR"
},
{
    name: "Copenhagen",
    code: "CPH",
    title: "Copenhagen, DK"
},
{
    name: "Dublin",
    code: "DUB",
    title: "Dublin, IE"
},
{
    name: "Lisbon Portela",
    code: "LIS",
    title: "Lisbon Portela, PT"
},
{
    name: "Stockholm Arlanda",
    code: "ARN",
    title: "Stockholm Arlanda, SE"
},
{
    name: "Vienna International",
    code: "VIE",
    title: "Vienna International, AT"
},
{
    name: "Zürich",
    code: "ZRH",
    title: "Zürich, CH"
},
{
    name: "Gdańsk Lech Wałęsa",
    code: "GDN",
    title: "Gdańsk Lech Wałęsa, PL"
}]

export default migration;