const finlandBic: { [key: string]: string } = {
    "1": "Nordea Pankki || NDEAFIHH",
    "2": "Nordea Pankki || NDEAFIHH",
    "31": "Handelsbanken || HANDFIHH",
    "33": "Skandinaviska Enskilda Banken || ESSEFIHX",
    "34": "Danske Bank || DABAFIHX",
    "36": "S-Pankki || SBANFIHH",
    "37": "DNB Bank || DNBAFIHX",
    "38": "Swedbank || SWEDFIHH",
    "39": "S-Pankki || SBANFIHH",
    "400": "Säästöpankki || ITELFIHH",
    "402": "Säästöpankki || ITELFIHH",
    "403": "Säästöpankki || ITELFIHH",
    "405": "Aktia Pankki || HELSFIHH",
    "406": "Säästöpankki || ITELFIHH",
    "407": "Säästöpankki || ITELFIHH",
    "408": "Säästöpankki || ITELFIHH",
    "41": "Säästöpankki || ITELFIHH",
    "42": "Säästöpankki || ITELFIHH",
    "43": "Säästöpankki || ITELFIHH",
    "44": "Säästöpankki || ITELFIHH",
    "45": "Säästöpankki || ITELFIHH",
    "46": "Säästöpankki || ITELFIHH",
    "47": "POP Pankki || POPFFI22",
    "48": "Säästöpankki || ITELFIHH",
    "490": "Säästöpankki || ITELFIHH",
    "491": "Säästöpankki || ITELFIHH",
    "492": "Säästöpankki || ITELFIHH",
    "493": "Säästöpankki || ITELFIHH",
    "495": "Säästöpankki || ITELFIHH",
    "496": "Säästöpankki || ITELFIHH",
    "497": "Aktia Pankki || HELSFIHH",
    "5": "Osuuspankki || OKOYFIHH",
    "6": "Ålandsbanken || AABAFI22",
    "713": "CityBank || CITIFIHX",
    "715": "Säästöpankki || ITELFIHH",
    "717": "Bigbank || BIGKFIH1",
    "799": "Holvi || HOLVFIHH",
    "8": "Danske Bank || DABAFIHH"
};

export function generateFinlandBic(iban: string) {

    iban = iban.replace(" ", "");

    for (var i = 3; i > 0; i--) {

        var key = iban.substr(4, i);
        var value = finlandBic[key];

        if (value) {
            return value;
        }
    }
    return null;
}