import { describe, it, expect } from "vitest";
import {
    pandemics,
    getCountryInteraction,
    getEpicentersForPandemic,
    getSurveillanceForPandemic,
    loadDossier,
    type PandemicProfile,
} from "@/data/pandemicsRegistry";

describe("Pandemic Era Isolation & Country Interaction Resolver", () => {
    describe("Plague of Justinian (541 AD) - Strict Whitelisting", () => {
        it("returns null for modern ISO-2 countries like US and ID", () => {
            expect(
                getCountryInteraction("plague-of-justinian-541", "US"),
            ).toBeNull();
            expect(
                getCountryInteraction("plague-of-justinian-541", "ID"),
            ).toBeNull();
            expect(
                getCountryInteraction("plague-of-justinian-541", "USA"),
            ).toBeNull();
            expect(
                getCountryInteraction("plague-of-justinian-541", "IDN"),
            ).toBeNull();
            expect(
                getCountryInteraction("plague-of-justinian-541", "CN"),
            ).toBeNull();
            expect(
                getCountryInteraction("plague-of-justinian-541", "IN"),
            ).toBeNull();
            expect(
                getCountryInteraction("plague-of-justinian-541", "BR"),
            ).toBeNull();
            expect(
                getCountryInteraction("plague-of-justinian-541", "RU"),
            ).toBeNull();
        });

        it("resolves primary epicenters for Justinian (CPX, PEL, SAS, ROM)", () => {
            const cpx = getCountryInteraction("plague-of-justinian-541", "CPX");
            expect(cpx).not.toBeNull();
            expect(cpx?.type).toBe("epicenter");
            expect(cpx?.code).toBe("CPX");
            expect(cpx?.epicenter?.name.en).toContain("Constantinople");

            // Also via geographic ISO codes (TR / TUR)
            const cpxViaTr = getCountryInteraction(
                "plague-of-justinian-541",
                "TR",
            );
            expect(cpxViaTr?.code).toBe("CPX");
            const cpxViaTur = getCountryInteraction(
                "plague-of-justinian-541",
                "TUR",
            );
            expect(cpxViaTur?.code).toBe("CPX");

            // Pelusium (PEL / EG / EGY)
            const pel = getCountryInteraction("plague-of-justinian-541", "PEL");
            expect(pel?.code).toBe("PEL");
            const pelViaEg = getCountryInteraction(
                "plague-of-justinian-541",
                "EG",
            );
            expect(pelViaEg?.code).toBe("PEL");

            // Sasanian (SAS / IR / IRN / IQ)
            const sas = getCountryInteraction("plague-of-justinian-541", "SAS");
            expect(sas?.code).toBe("SAS");
            const sasViaIr = getCountryInteraction(
                "plague-of-justinian-541",
                "IR",
            );
            expect(sasViaIr?.code).toBe("SAS");

            // Rome (ROM / IT / ITA)
            const rom = getCountryInteraction("plague-of-justinian-541", "ROM");
            expect(rom?.code).toBe("ROM");
            const romViaIt = getCountryInteraction(
                "plague-of-justinian-541",
                "IT",
            );
            expect(romViaIt?.code).toBe("ROM");
        });

        it("resolves secondary surveillance territories for Justinian (GAU, HIS, BRI, AFR, LEV)", () => {
            const gau = getCountryInteraction("plague-of-justinian-541", "GAU");
            expect(gau).not.toBeNull();
            expect(gau?.type).toBe("surveillance");
            expect(gau?.code).toBe("GAU");
            expect(gau?.surveillance?.name.en).toContain("Gaul");

            // Via FR / FRA
            const gauViaFr = getCountryInteraction(
                "plague-of-justinian-541",
                "FR",
            );
            expect(gauViaFr?.code).toBe("GAU");

            // Hispania (HIS / ES / ESP)
            const his = getCountryInteraction("plague-of-justinian-541", "HIS");
            expect(his?.code).toBe("HIS");
            const hisViaEs = getCountryInteraction(
                "plague-of-justinian-541",
                "ES",
            );
            expect(hisViaEs?.code).toBe("HIS");

            // Britain (BRI / GB / GBR)
            const bri = getCountryInteraction("plague-of-justinian-541", "BRI");
            expect(bri?.code).toBe("BRI");

            // Africa (AFR / TN / TUN / DZ)
            const afr = getCountryInteraction("plague-of-justinian-541", "AFR");
            expect(afr?.code).toBe("AFR");

            // Levant (LEV / SY / SYR / LB)
            const lev = getCountryInteraction("plague-of-justinian-541", "LEV");
            expect(lev?.code).toBe("LEV");
        });
    });

    describe("COVID-19 - Isolation from Historical Codes", () => {
        it("resolves modern COVID-19 epicenters (ID, CN, IT, US, IN)", () => {
            const id = getCountryInteraction("covid-19", "ID");
            expect(id).not.toBeNull();
            expect(id?.type).toBe("epicenter");
            expect(id?.code).toBe("ID");

            const us = getCountryInteraction("covid-19", "US");
            expect(us).not.toBeNull();
            expect(us?.type).toBe("epicenter");
            expect(us?.code).toBe("US");
        });

        it("returns null for Justinian custom sector codes when in COVID-19 era", () => {
            expect(getCountryInteraction("covid-19", "CPX")).toBeNull();
            expect(getCountryInteraction("covid-19", "PEL")).toBeNull();
            expect(getCountryInteraction("covid-19", "SAS")).toBeNull();
            expect(getCountryInteraction("covid-19", "GAU")).toBeNull();
            expect(getCountryInteraction("covid-19", "HIS")).toBeNull();
            expect(getCountryInteraction("covid-19", "BRI")).toBeNull();
            expect(getCountryInteraction("covid-19", "AFR")).toBeNull();
            expect(getCountryInteraction("covid-19", "LEV")).toBeNull();
            expect(getCountryInteraction("covid-19", "KAF")).toBeNull();
            expect(getCountryInteraction("covid-19", "MES")).toBeNull();
            expect(getCountryInteraction("covid-19", "LON")).toBeNull();
            expect(getCountryInteraction("covid-19", "PAR")).toBeNull();
        });
    });

    describe("Black Death (1347 AD) - Strict Whitelisting & Sector Resolution", () => {
        it("returns active status and registered metadata in pandemic profile", () => {
            const bd = pandemics.find(
                (p: PandemicProfile) => p.id === "black-death-1347",
            );
            expect(bd).toBeDefined();
            expect(bd?.status).toBe("active");
            expect(bd?.year).toBe(1347);
            expect(bd?.themeColor).toBe("#e11d48");
            expect(bd?.cameraInitialPosition).toEqual({
                lat: 45.0,
                lng: 35.0,
                altitude: 2.2,
            });
            expect(bd?.primaryEpicenters).toEqual(["KAF", "MES", "LON", "PAR"]);
            expect(bd?.surveillanceRegions).toEqual([
                "FLR",
                "AVN",
                "VEN",
                "KRA",
                "MOS",
                "CAI",
            ]);
        });

        it("resolves primary epicenters for Black Death (KAF, MES, LON, PAR)", () => {
            // KAF (Kaffa / Crimea)
            const kaf = getCountryInteraction("black-death-1347", "KAF");
            expect(kaf).not.toBeNull();
            expect(kaf?.type).toBe("epicenter");
            expect(kaf?.code).toBe("KAF");
            expect(kaf?.epicenter?.name.en).toContain("Kaffa");

            const kafViaUa = getCountryInteraction("black-death-1347", "UA");
            expect(kafViaUa?.code).toBe("KAF");

            // MES (Messina / Italy)
            const mes = getCountryInteraction("black-death-1347", "MES");
            expect(mes?.code).toBe("MES");
            const mesViaIt = getCountryInteraction("black-death-1347", "IT");
            expect(mesViaIt?.code).toBe("MES");

            // LON (London / England)
            const lon = getCountryInteraction("black-death-1347", "LON");
            expect(lon?.code).toBe("LON");
            const lonViaGb = getCountryInteraction("black-death-1347", "GB");
            expect(lonViaGb?.code).toBe("LON");

            // PAR (Paris / France)
            const par = getCountryInteraction("black-death-1347", "PAR");
            expect(par?.code).toBe("PAR");
            const parViaFr = getCountryInteraction("black-death-1347", "FR");
            expect(parViaFr?.code).toBe("PAR");
        });

        it("resolves secondary surveillance targets (FLR, AVN, VEN, KRA, MOS, CAI)", () => {
            const flr = getCountryInteraction("black-death-1347", "FLR");
            expect(flr?.type).toBe("surveillance");
            expect(flr?.code).toBe("FLR");

            const avn = getCountryInteraction("black-death-1347", "AVN");
            expect(avn?.code).toBe("AVN");

            const ven = getCountryInteraction("black-death-1347", "VEN");
            expect(ven?.code).toBe("VEN");

            const kra = getCountryInteraction("black-death-1347", "KRA");
            expect(kra?.code).toBe("KRA");
            const kraViaPl = getCountryInteraction("black-death-1347", "PL");
            expect(kraViaPl?.code).toBe("KRA");

            const mos = getCountryInteraction("black-death-1347", "MOS");
            expect(mos?.code).toBe("MOS");

            const cai = getCountryInteraction("black-death-1347", "CAI");
            expect(cai?.code).toBe("CAI");
        });

        it("returns null for non-relevant countries and Justinian sectors in Black Death era", () => {
            expect(getCountryInteraction("black-death-1347", "US")).toBeNull();
            expect(getCountryInteraction("black-death-1347", "ID")).toBeNull();
            expect(getCountryInteraction("black-death-1347", "BR")).toBeNull();
            expect(getCountryInteraction("black-death-1347", "CPX")).toBeNull();
            expect(getCountryInteraction("black-death-1347", "PEL")).toBeNull();
            expect(getCountryInteraction("black-death-1347", "SAS")).toBeNull();
            expect(getCountryInteraction("black-death-1347", "ROM")).toBeNull();
        });

        it("loads complete 20-chapter dossier for Sector MES via loadDossier", async () => {
            const chapters = await loadDossier("black-death-1347", "MES");
            expect(chapters).not.toBeNull();
            expect(chapters?.length).toBe(20);

            // Chapter 1 integrity check
            const ch1 = chapters![0];
            expect(ch1.id).toBe("mes-ch-01");
            expect(ch1.chapterNumber).toBe(1);
            expect(ch1.title.id).toBe("Galai Hantu di Selat Messina");
            expect(ch1.title.en).toBe("The Ghost Galleys of the Strait");
            expect(ch1.image).toBe(
                "/assets/images/black-death-1347/mes/mes_ch_01.jpg",
            );
            expect(ch1.virusProfile.agent).toContain("Yersinia pestis");

            // Chapter 20 integrity check
            const ch20 = chapters![19];
            expect(ch20.id).toBe("mes-ch-20");
            expect(ch20.chapterNumber).toBe(20);
            expect(ch20.image).toBe(
                "/assets/images/black-death-1347/mes/mes_ch_20.jpg",
            );

            // Case insensitivity check
            const chaptersLower = await loadDossier("black-death-1347", "mes");
            expect(chaptersLower?.length).toBe(20);

            // Unknown sector returns null
            const invalidSector = await loadDossier(
                "black-death-1347",
                "UNKNOWN",
            );
            expect(invalidSector).toBeNull();
        });

        it("loads complete 20-chapter dossier for Sector PAR via loadDossier", async () => {
            const chapters = await loadDossier("black-death-1347", "PAR");
            expect(chapters).not.toBeNull();
            expect(chapters?.length).toBe(20);

            // Chapter 1 integrity check
            const ch1 = chapters![0];
            expect(ch1.id).toBe("par-ch-01");
            expect(ch1.chapterNumber).toBe(1);
            expect(ch1.title.id).toBe(
                "Metropolis di Tepi Sungai Seine: Paris Abad ke-14",
            );
            expect(ch1.title.en).toBe(
                "Metropolis on the Seine: 14th-Century Paris",
            );
            expect(ch1.image).toBe(
                "/assets/images/black-death-1347/par/par_ch_01.jpg",
            );
            expect(ch1.virusProfile.agent).toContain("Yersinia pestis");

            // Chapter 20 integrity check
            const ch20 = chapters![19];
            expect(ch20.id).toBe("par-ch-20");
            expect(ch20.chapterNumber).toBe(20);
            expect(ch20.image).toBe(
                "/assets/images/black-death-1347/par/par_ch_20.jpg",
            );

            // Case insensitivity check
            const chaptersLower = await loadDossier("black-death-1347", "par");
            expect(chaptersLower?.length).toBe(20);
        });

        it("loads complete 20-chapter dossier for Sector LON via loadDossier", async () => {
            const chapters = await loadDossier("black-death-1347", "LON");
            expect(chapters).not.toBeNull();
            expect(chapters?.length).toBe(20);

            // Chapter 1 integrity check
            const ch1 = chapters![0];
            expect(ch1.id).toBe("lon-ch-01");
            expect(ch1.chapterNumber).toBe(1);
            expect(ch1.title.id).toBe(
                "Pendaratan di Melcombe Regis: Maut Menyeberangi Selat",
            );
            expect(ch1.title.en).toBe(
                "Landfall at Melcombe Regis: Crossing the English Channel",
            );
            expect(ch1.image).toBe(
                "/assets/images/black-death-1347/lon/lon_ch_01.jpg",
            );
            expect(ch1.virusProfile.agent).toContain("Yersinia pestis");

            // Chapter 20 integrity check
            const ch20 = chapters![19];
            expect(ch20.id).toBe("lon-ch-20");
            expect(ch20.chapterNumber).toBe(20);
            expect(ch20.image).toBe(
                "/assets/images/black-death-1347/lon/lon_ch_20.jpg",
            );

            // Case insensitivity check
            const chaptersLower = await loadDossier("black-death-1347", "lon");
            expect(chaptersLower?.length).toBe(20);
        });

        it("loads complete 16-chapter dossier for Sector KAF via loadDossier", async () => {
            const chapters = await loadDossier("black-death-1347", "KAF");
            expect(chapters).not.toBeNull();
            expect(chapters?.length).toBe(16);

            // Chapter 1 integrity check
            const ch1 = chapters![0];
            expect(ch1.id).toBe("kaf-ch-01");
            expect(ch1.chapterNumber).toBe(1);
            expect(ch1.title.id).toBe(
                "Benteng Kaffa: Pos Terdepan Republik Genoa di Laut Hitam",
            );
            expect(ch1.title.en).toBe(
                "Fortress of Kaffa: Genoa's Black Sea Outpost",
            );
            expect(ch1.image).toBe(
                "/assets/images/black-death-1347/kaf/kaf_ch_01.jpg",
            );
            expect(ch1.virusProfile.agent).toContain("Yersinia pestis");

            // Chapter 16 integrity check
            const ch16 = chapters![15];
            expect(ch16.id).toBe("kaf-ch-16");
            expect(ch16.chapterNumber).toBe(16);
            expect(ch16.image).toBe(
                "/assets/images/black-death-1347/kaf/kaf_ch_16.jpg",
            );

            // Case insensitivity check
            const chaptersLower = await loadDossier("black-death-1347", "kaf");
            expect(chaptersLower?.length).toBe(16);
        });
    });

    describe("Historical Era Catalogs Integrity", () => {
        it("returns correct surveillance catalog per pandemic", () => {
            const justinianSurv = getSurveillanceForPandemic(
                "plague-of-justinian-541",
            );
            expect(justinianSurv.GAU).toBeDefined();
            expect(justinianSurv.HIS).toBeDefined();
            expect(justinianSurv.US).toBeUndefined();

            const covidSurv = getSurveillanceForPandemic("covid-19");
            expect(covidSurv.US).toBeDefined();
            expect(covidSurv.GAU).toBeUndefined();
        });

        it("returns correct epicenter catalog per pandemic", () => {
            const justinianEpi = getEpicentersForPandemic(
                "plague-of-justinian-541",
            );
            expect(justinianEpi.CPX).toBeDefined();
            expect(justinianEpi.PEL).toBeDefined();
            expect(justinianEpi.ID).toBeUndefined();

            const covidEpi = getEpicentersForPandemic("covid-19");
            expect(covidEpi.ID).toBeDefined();
            expect(covidEpi.CPX).toBeUndefined();
        });
    });

    describe("Primary Epicenters Configuration across All 5 Pandemics", () => {
        it("defines primaryEpicenters correctly for each pandemic", () => {
            const justinian = pandemics.find(
                (p: PandemicProfile) => p.id === "plague-of-justinian-541",
            );
            expect(justinian?.primaryEpicenters).toEqual([
                "CPX",
                "PEL",
                "SAS",
                "ROM",
            ]);

            const covid = pandemics.find(
                (p: PandemicProfile) => p.id === "covid-19",
            );
            expect(covid?.primaryEpicenters).toEqual([
                "ID",
                "US",
                "CN",
                "IN",
                "IT",
            ]);

            const blackDeath = pandemics.find(
                (p: PandemicProfile) => p.id === "black-death-1347",
            );
            expect(blackDeath?.primaryEpicenters).toBeDefined();
            expect(blackDeath?.primaryEpicenters?.length).toBeGreaterThan(0);

            const cholera = pandemics.find(
                (p: PandemicProfile) => p.id === "cholera-1817",
            );
            expect(cholera?.primaryEpicenters).toBeDefined();

            const spanishFlu = pandemics.find(
                (p: PandemicProfile) => p.id === "spanish-flu-1918",
            );
            expect(spanishFlu?.primaryEpicenters).toBeDefined();
        });

        it("ensures each epicenter territory within every pandemic has a unique differentiated color", () => {
            pandemics.forEach((p: PandemicProfile) => {
                const epicenters = getEpicentersForPandemic(p.id);
                const epicenterList = Object.values(epicenters);
                const colors = epicenterList.map((e) =>
                    e.beaconColor.toLowerCase(),
                );

                // Uniqueness guarantee: no two epicenters in the same pandemic share a color
                const uniqueColors = new Set(colors);
                expect(
                    uniqueColors.size,
                    `Pandemic ${p.id} has duplicate epicenter colors: ${colors.join(", ")}`,
                ).toBe(epicenterList.length);
            });

            // Explicit checks for COVID-19 and Justinian
            const covidEpi = getEpicentersForPandemic("covid-19");
            expect(covidEpi.ID.beaconColor).not.toBe(covidEpi.US.beaconColor);
            expect(covidEpi.IT.beaconColor).not.toBe(covidEpi.US.beaconColor);
            expect(covidEpi.CN.beaconColor).not.toBe(covidEpi.IN.beaconColor);

            const justinianEpi = getEpicentersForPandemic(
                "plague-of-justinian-541",
            );
            expect(justinianEpi.CPX.beaconColor).not.toBe(
                justinianEpi.PEL.beaconColor,
            );
            expect(justinianEpi.SAS.beaconColor).not.toBe(
                justinianEpi.ROM.beaconColor,
            );
            expect(justinianEpi.CPX.beaconColor).not.toBe(
                justinianEpi.ROM.beaconColor,
            );
        });
    });
});
