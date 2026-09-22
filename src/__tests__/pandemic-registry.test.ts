import { describe, it, expect } from "vitest";
import {
    pandemics,
    getCountryInteraction,
    getEpicentersForPandemic,
    getSurveillanceForPandemic,
    loadDossier,
    type PandemicProfile,
} from "@/data/pandemicsRegistry";
import {
    CHOLERA_WAVES,
    parseCholeraWaveParam,
    inferWaveIndexFromSector,
} from "@/data/pandemics/cholera/waves";
import {
    getWave1Sector,
    WAVE_1_PRIMARY_SECTORS,
} from "@/data/pandemics/cholera/waves/wave-1";
import {
    getWave2Sector,
    WAVE_2_PRIMARY_SECTORS,
    WAVE_2_SECTORS,
} from "@/data/pandemics/cholera/waves/wave-2";
import {
    getWave3Sector,
    WAVE_3_PRIMARY_SECTORS,
    WAVE_3_SECTORS,
} from "@/data/pandemics/cholera/waves/wave-3";
import {
    getWave4Sector,
    WAVE_4_PRIMARY_SECTORS,
    WAVE_4_SECTORS,
} from "@/data/pandemics/cholera/waves/wave-4";
import {
    getWave5Sector,
    WAVE_5_PRIMARY_SECTORS,
    WAVE_5_SECTORS,
} from "@/data/pandemics/cholera/waves/wave-5";
import {
    getWave6Sector,
    WAVE_6_PRIMARY_SECTORS,
    WAVE_6_SECTORS,
} from "@/data/pandemics/cholera/waves/wave-6";
import {
    getWave7Sector,
    WAVE_7_PRIMARY_SECTORS,
    WAVE_7_SECTORS,
} from "@/data/pandemics/cholera/waves/wave-7";

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
                (p: PandemicProfile) =>
                    p.id === "cholera-series" || p.id === "cholera-1817",
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

    describe("Seven Cholera Pandemics Architecture (cholera-series)", () => {
        it("registers cholera-series with active status and theme color #06b6d4", () => {
            const choleraSeries = pandemics.find(
                (p: PandemicProfile) => p.id === "cholera-series",
            );
            expect(choleraSeries).toBeDefined();
            expect(choleraSeries?.status).toBe("active");
            expect(choleraSeries?.themeColor).toBe("#06b6d4");
            expect(choleraSeries?.name.en).toContain("The Cholera Pandemics");
            expect(choleraSeries?.name.id).toContain("Pandemi Kolera");
            expect(choleraSeries?.cameraInitialPosition).toBeDefined();
        });

        it("defines all 7 distinct pandemic waves in CHOLERA_WAVES", () => {
            expect(CHOLERA_WAVES).toHaveLength(7);

            CHOLERA_WAVES.forEach((wave, idx) => {
                expect(wave.waveIndex).toBe(idx);
                expect(wave.waveNumber).toBe(idx + 1);
                expect(wave.shortLabel).toBe(`W${idx + 1}`);
                expect(wave.name.en).toBeDefined();
                expect(wave.name.id).toBeDefined();
                expect(wave.subtitle.en).toBeDefined();
                expect(wave.subtitle.id).toBeDefined();
                expect(wave.historicalContext.en).toBeDefined();
                expect(wave.historicalContext.id).toBeDefined();
                expect(wave.cameraPosition.lat).toBeTypeOf("number");
                expect(wave.cameraPosition.lng).toBeTypeOf("number");
                expect(wave.cameraPosition.altitude).toBeTypeOf("number");
                expect(wave.metrics.length).toBeGreaterThan(0);
                expect(
                    Object.keys(wave.primaryEpicenters).length,
                ).toBeGreaterThanOrEqual(3);

                // Ensure unique differentiated beacon colors within each wave
                const epicenters = Object.values(wave.primaryEpicenters);
                const colors = epicenters.map((e) =>
                    e.beaconColor.toLowerCase(),
                );
                const uniqueColors = new Set(colors);
                expect(
                    uniqueColors.size,
                    `Wave ${wave.shortLabel} has duplicate epicenter colors: ${colors.join(", ")}`,
                ).toBe(epicenters.length);
            });
        });

        it("resolves wave-specific epicenters via getEpicentersForPandemic", () => {
            // Wave 1: Jessore, Batavia, Basra
            const wave1Epi = getEpicentersForPandemic("cholera-series", 0);
            expect(wave1Epi.JES).toBeDefined();
            expect(wave1Epi.BAT).toBeDefined();
            expect(wave1Epi.BSO).toBeDefined();
            expect(wave1Epi.HAM).toBeUndefined();

            // Wave 3: John Snow (London)
            const wave3Epi = getEpicentersForPandemic("cholera-series", 2);
            expect(wave3Epi.LON).toBeDefined();
            expect(wave3Epi.CAL).toBeDefined();
            expect(wave3Epi.PAR).toBeDefined();
            expect(wave3Epi.NYC).toBeDefined();

            // Wave 7: Sulawesi / El Tor
            const wave7Epi = getEpicentersForPandemic("cholera-series", 6);
            expect(wave7Epi.MAK).toBeDefined();
            expect(wave7Epi.PAP).toBeDefined();
            expect(wave7Epi.YEM).toBeDefined();
            expect(wave7Epi.HAR).toBeDefined();
        });

        it("resolves wave-specific country interactions with zero data bleed", () => {
            // Wave 1: JES is an epicenter
            const jes = getCountryInteraction("cholera-series", "JES", 0);
            expect(jes).not.toBeNull();
            expect(jes?.type).toBe("epicenter");
            expect(jes?.code).toBe("JES");

            // In Wave 1, NYC is NOT active (should be null)
            expect(
                getCountryInteraction("cholera-series", "NYC", 0),
            ).toBeNull();

            // In Wave 2, NYC is an alias resolving to USA epicenter
            const nyc = getCountryInteraction("cholera-series", "NYC", 1);
            expect(nyc).not.toBeNull();
            expect(nyc?.type).toBe("epicenter");
            expect(nyc?.code).toBe("USA");

            // Surveillance: In Wave 1, BAG is surveillance
            const bag = getCountryInteraction("cholera-series", "BAG", 0);
            expect(bag).not.toBeNull();
            expect(bag?.type).toBe("surveillance");

            // Unrelated countries return null
            expect(getCountryInteraction("cholera-series", "BR", 0)).toBeNull();
            expect(getCountryInteraction("cholera-series", "ZA", 0)).toBeNull();
        });

        it("loads complete 18-chapter dossier for Sector JES via loadDossier", async () => {
            const chapters = await loadDossier("cholera-series", "JES");
            expect(chapters).not.toBeNull();
            expect(chapters).toHaveLength(18);

            // Check chapter 1
            const ch1 = chapters![0];
            expect(ch1.id).toBe("jes-ch-01");
            expect(ch1.chapterNumber).toBe(1);
            expect(ch1.title.en).toBe(
                "The Sundarbans Mangrove: Reservoir of the Bacillus",
            );
            expect(ch1.title.id).toBe(
                "Rawa Sundarbans: Reservoir Abadi Sang Basil",
            );
            expect(ch1.image).toBe(
                "/assets/images/cholera/wave-1/jes/jes_ch_01.jpg",
            );

            // Check chapter 18 (Summary / Epilogue)
            const ch18 = chapters![17];
            expect(ch18.id).toBe("jes-ch-18");
            expect(ch18.chapterNumber).toBe(18);
            expect(ch18.title.en).toBe(
                "Epilogue Wave 1: The Dawn of Global Cholera",
            );
            expect(ch18.title.id).toBe(
                "Epilog Wave 1: Fajar Pandemi Kolera Global",
            );
            expect(ch18.image).toBe(
                "/assets/images/cholera/wave-1/jes/jes_ch_18.jpg",
            );

            // Lowercase and alias compatibility
            const chaptersLower = await loadDossier("cholera-series", "jes");
            expect(chaptersLower).toHaveLength(18);

            const chaptersLegacy = await loadDossier("cholera-1817", "JES");
            expect(chaptersLegacy).toHaveLength(18);
        });

        it("loads complete 18-chapter dossier for Sector BAT via loadDossier", async () => {
            const chapters = await loadDossier("cholera-series", "BAT");
            expect(chapters).not.toBeNull();
            expect(chapters).toHaveLength(18);

            // Check chapter 1
            const ch1 = chapters![0];
            expect(ch1.id).toBe("bat-ch-01");
            expect(ch1.chapterNumber).toBe(1);
            expect(ch1.type).toBe("milestone");
            expect(ch1.title.en).toBe("Fatal Ingress at Sunda Kelapa Harbor");
            expect(ch1.title.id).toBe("Pendaratan Maut di Muara Sunda Kelapa");
            expect(ch1.image).toBe(
                "/assets/images/cholera/wave-1/bat/bat_ch_01.jpg",
            );

            // Check chapter 18 (Summary / Epilogue)
            const ch18 = chapters![17];
            expect(ch18.id).toBe("bat-ch-18");
            expect(ch18.chapterNumber).toBe(18);
            expect(ch18.type).toBe("summary");
            expect(ch18.title.en).toBe(
                "Epilogue of the First Java Wave: Urban Decentralization and Weltevreden's Sanitarium Legacy",
            );
            expect(ch18.title.id).toBe(
                "Epilog Gelombang Pertama Jawa: Warisan Tata Kota dan Sanitasi Weltevreden",
            );
            expect(ch18.image).toBe(
                "/assets/images/cholera/wave-1/bat/bat_ch_18.jpg",
            );

            // Verify all 18 chapters have required fields
            chapters?.forEach((ch, idx) => {
                expect(ch.id).toBe(
                    `bat-ch-${String(idx + 1).padStart(2, "0")}`,
                );
                expect(ch.chapterNumber).toBe(idx + 1);
                expect(ch.title.id).toBeTruthy();
                expect(ch.title.en).toBeTruthy();
                expect(ch.date.id).toBeTruthy();
                expect(ch.date.en).toBeTruthy();
                expect(ch.flash.id).toBeTruthy();
                expect(ch.flash.en).toBeTruthy();
                expect(ch.description.id).toBeTruthy();
                expect(ch.description.en).toBeTruthy();
                expect(ch.virusProfile).toBeDefined();
                expect(ch.image).toBe(
                    `/assets/images/cholera/wave-1/bat/bat_ch_${String(idx + 1).padStart(2, "0")}.jpg`,
                );
            });

            // Case-insensitive and alias resolution
            const chaptersLower = await loadDossier("cholera-series", "bat");
            expect(chaptersLower).toHaveLength(18);

            const chaptersLegacy = await loadDossier("cholera-1817", "BAT");
            expect(chaptersLegacy).toHaveLength(18);
        });

        it("loads complete 16-chapter dossier for Sector BSO via loadDossier and supports aliases/fallbacks", async () => {
            const chapters = await loadDossier("cholera-series", "BSO");
            expect(chapters).not.toBeNull();
            expect(chapters).toHaveLength(16);

            // Check chapter 1
            const ch1 = chapters![0];
            expect(ch1.id).toBe("bso-ch-01");
            expect(ch1.chapterNumber).toBe(1);
            expect(ch1.type).toBe("milestone");
            expect(ch1.title.en).toBe(
                "Lethal Arrival of Bombay Rice Ships at Muscat Harbor",
            );
            expect(ch1.title.id).toBe(
                "Pendaratan Maut Kapal Beras Bombay di Muskat",
            );
            expect(ch1.image).toBe(
                "/assets/images/cholera/wave-1/bso/bso_ch_01.jpg",
            );

            // Check chapter 16 (Summary / Epilogue)
            const ch16 = chapters![15];
            expect(ch16.id).toBe("bso-ch-16");
            expect(ch16.chapterNumber).toBe(16);
            expect(ch16.type).toBe("summary");
            expect(ch16.title.en).toBe(
                "Epilogue Sector BSO: Persian Gulf Sanitary Legacy and the Caucasus Quarantine Barrier",
            );
            expect(ch16.title.id).toBe(
                "Epilog Sektor BSO: Warisan Sanitasi Teluk Persia dan Benteng Karantina Kaukasus",
            );
            expect(ch16.image).toBe(
                "/assets/images/cholera/wave-1/bso/bso_ch_16.jpg",
            );

            // Verify all 16 chapters have required fields
            chapters?.forEach((ch, idx) => {
                expect(ch.id).toBe(
                    `bso-ch-${String(idx + 1).padStart(2, "0")}`,
                );
                expect(ch.chapterNumber).toBe(idx + 1);
                expect(ch.title.id).toBeTruthy();
                expect(ch.title.en).toBeTruthy();
                expect(ch.date.id).toBeTruthy();
                expect(ch.date.en).toBeTruthy();
                expect(ch.flash.id).toBeTruthy();
                expect(ch.flash.en).toBeTruthy();
                expect(ch.description.id).toBeTruthy();
                expect(ch.description.en).toBeTruthy();
                expect(ch.virusProfile).toBeDefined();
                expect(ch.image).toBe(
                    `/assets/images/cholera/wave-1/bso/bso_ch_${String(idx + 1).padStart(2, "0")}.jpg`,
                );
            });

            // Backward-compatible alias MUS -> BSO
            const chaptersFromMus = await loadDossier("cholera-series", "MUS");
            expect(chaptersFromMus).toHaveLength(16);
            expect(chaptersFromMus![0].id).toBe("bso-ch-01");

            // Backward-compatible alias CAL -> JES
            const chaptersFromCal = await loadDossier("cholera-series", "CAL");
            expect(chaptersFromCal).toHaveLength(18);
            expect(chaptersFromCal![0].id).toBe("jes-ch-01");

            // Default Wave 1 sector fallback (wave-1 -> JES)
            const chaptersFallback = await loadDossier(
                "cholera-series",
                "wave-1",
            );
            expect(chaptersFallback).toHaveLength(18);
            expect(chaptersFallback![0].id).toBe("jes-ch-01");
        });

        it("harmonizes Wave 1 barrel export (getWave1Sector & WAVE_1_PRIMARY_SECTORS)", () => {
            expect(WAVE_1_PRIMARY_SECTORS).toHaveLength(3);
            expect(WAVE_1_PRIMARY_SECTORS.map((s) => s.code)).toEqual([
                "JES",
                "BAT",
                "BSO",
            ]);

            // Sector datasets
            expect(getWave1Sector("JES").chapters).toHaveLength(18);
            expect(getWave1Sector("CAL").chapters).toHaveLength(18);
            expect(getWave1Sector("BAT").chapters).toHaveLength(18);
            expect(getWave1Sector("BSO").chapters).toHaveLength(16);
            expect(getWave1Sector("MUS").chapters).toHaveLength(16);
            expect(getWave1Sector("wave-1").chapters).toHaveLength(18);
            expect(getWave1Sector().chapters).toHaveLength(18);
        });
    });

    describe("Second Cholera Pandemic (1829–1851 AD / Wave 2) - Multi-Sector Architecture", () => {
        it("registers Wave 2 in CHOLERA_WAVES with 5 primary epicenters (RUS, GBR, FRA, USA, MEK)", () => {
            const wave2 = CHOLERA_WAVES[1];
            expect(wave2).toBeDefined();
            expect(wave2.id).toBe("wave-2");
            expect(wave2.waveNumber).toBe(2);
            expect(wave2.slug).toBe("eurasia-1829");
            expect(Object.keys(wave2.primaryEpicenters)).toEqual([
                "RUS",
                "GBR",
                "FRA",
                "USA",
                "MEK",
            ]);

            // Epicenter metadata check
            expect(wave2.primaryEpicenters.RUS.code).toBe("RUS");
            expect(wave2.primaryEpicenters.GBR.code).toBe("GBR");
            expect(wave2.primaryEpicenters.FRA.code).toBe("FRA");
            expect(wave2.primaryEpicenters.USA.code).toBe("USA");
            expect(wave2.primaryEpicenters.MEK.code).toBe("MEK");

            // Surveillance check
            expect(wave2.surveillance.STP).toBeDefined();
            expect(wave2.surveillance.STP.name.en).toContain(
                "Saint Petersburg",
            );
        });

        it("harmonizes Wave 2 barrel export (getWave2Sector & WAVE_2_PRIMARY_SECTORS)", () => {
            expect(WAVE_2_PRIMARY_SECTORS).toHaveLength(5);
            expect(WAVE_2_PRIMARY_SECTORS.map((s) => s.code)).toEqual([
                "RUS",
                "GBR",
                "FRA",
                "USA",
                "MEK",
            ]);

            // Sector datasets integrity
            expect(getWave2Sector("RUS").chapters).toHaveLength(14);
            expect(getWave2Sector("MOS").chapters).toHaveLength(14);
            expect(getWave2Sector("GBR").chapters).toHaveLength(14);
            expect(getWave2Sector("LON").chapters).toHaveLength(14);
            expect(getWave2Sector("FRA").chapters).toHaveLength(14);
            expect(getWave2Sector("PAR").chapters).toHaveLength(14);
            expect(getWave2Sector("USA").chapters).toHaveLength(14);
            expect(getWave2Sector("NYC").chapters).toHaveLength(14);
            expect(getWave2Sector("MEK").chapters).toHaveLength(14);
            expect(getWave2Sector("MEC").chapters).toHaveLength(14);
            expect(getWave2Sector("wave-2").chapters).toHaveLength(14);
            expect(getWave2Sector().chapters).toHaveLength(14);
        });

        it("loads complete dossier for Sector RUS via loadDossier with full schema fidelity", async () => {
            const chapters = await loadDossier("cholera-series", "RUS");
            expect(chapters).not.toBeNull();
            expect(chapters).toHaveLength(14);

            // Chapter 1 milestone
            const ch1 = chapters![0];
            expect(ch1.id).toBe("rus-ch-01");
            expect(ch1.chapterNumber).toBe(1);
            expect(ch1.type).toBe("milestone");
            expect(ch1.title.en).toBe(
                "The Orenburg Breach: Caravans from Central Asia",
            );
            expect(ch1.title.id).toBe(
                "Penetrasi Orenburg: Kafilah dari Asia Tengah",
            );
            expect(ch1.image).toBe(
                "/assets/images/cholera/wave-2/rus/rus_ch_01.jpg",
            );

            // Chapter 14 summary
            const ch14 = chapters![13];
            expect(ch14.id).toBe("rus-ch-14");
            expect(ch14.type).toBe("summary");
            expect(ch14.title.en).toBe(
                "Legacy of the Russian Firestorm: Collapse of Cordon Miasma",
            );
            expect(ch14.image).toBe(
                "/assets/images/cholera/wave-2/rus/rus_ch_14.jpg",
            );

            // Backward-compatible alias MOS -> RUS
            const fromMos = await loadDossier("cholera-series", "MOS");
            expect(fromMos).toHaveLength(14);
            expect(fromMos![0].id).toBe("rus-ch-01");
        });

        it("loads complete dossier for Sector GBR via loadDossier with full schema fidelity", async () => {
            const chapters = await loadDossier("cholera-series", "GBR");
            expect(chapters).not.toBeNull();
            expect(chapters).toHaveLength(14);

            const ch1 = chapters![0];
            expect(ch1.id).toBe("gbr-ch-01");
            expect(ch1.chapterNumber).toBe(1);
            expect(ch1.title.en).toBe(
                "Sunderland Coal Port: The Baltic Landfall",
            );
            expect(ch1.image).toBe(
                "/assets/images/cholera/wave-2/gbr/gbr_ch_01.jpg",
            );

            const ch14 = chapters![13];
            expect(ch14.id).toBe("gbr-ch-14");
            expect(ch14.type).toBe("summary");
            expect(ch14.title.en).toBe(
                "Legacy of the 1831–32 Epidemic: Dawn of Sanitary Reform",
            );

            // Backward-compatible alias LON -> GBR
            const fromLon = await loadDossier("cholera-series", "LON");
            expect(fromLon).toHaveLength(14);
            expect(fromLon![0].id).toBe("gbr-ch-01");
        });

        it("loads complete dossier for Sector FRA via loadDossier with full schema fidelity", async () => {
            const chapters = await loadDossier("cholera-series", "FRA");
            expect(chapters).not.toBeNull();
            expect(chapters).toHaveLength(14);

            const ch1 = chapters![0];
            expect(ch1.id).toBe("fra-ch-01");
            expect(ch1.title.en).toBe(
                "The English Channel Ingress: Calais & Dieppe Landfall",
            );
            expect(ch1.image).toBe(
                "/assets/images/cholera/wave-2/fra/fra_ch_01.jpg",
            );

            // Chapter 2 Mi-Carême Carnival
            const ch2 = chapters![1];
            expect(ch2.id).toBe("fra-ch-02");
            expect(ch2.title.en).toBe(
                "The Mi-Carême Carnival: The Dance of Death Masquerade",
            );

            // Backward-compatible alias PAR -> FRA
            const fromPar = await loadDossier("cholera-series", "PAR");
            expect(fromPar).toHaveLength(14);
            expect(fromPar![0].id).toBe("fra-ch-01");
        });

        it("loads complete dossier for Sector USA via loadDossier with full schema fidelity", async () => {
            const chapters = await loadDossier("cholera-series", "USA");
            expect(chapters).not.toBeNull();
            expect(chapters).toHaveLength(14);

            const ch1 = chapters![0];
            expect(ch1.id).toBe("usa-ch-01");
            expect(ch1.title.en).toBe(
                "The Transatlantic Crossing: The Carricks & Grosse Île",
            );
            expect(ch1.image).toBe(
                "/assets/images/cholera/wave-2/usa/usa_ch_01.jpg",
            );

            // Backward-compatible alias NYC -> USA
            const fromNyc = await loadDossier("cholera-series", "NYC");
            expect(fromNyc).toHaveLength(14);
            expect(fromNyc![0].id).toBe("usa-ch-01");
        });

        it("loads complete dossier for Sector MEK via loadDossier with full schema fidelity", async () => {
            const chapters = await loadDossier("cholera-series", "MEK");
            expect(chapters).not.toBeNull();
            expect(chapters).toHaveLength(14);

            const ch1 = chapters![0];
            expect(ch1.id).toBe("mek-ch-01");
            expect(ch1.title.en).toBe(
                "Red Sea Dhow Corridors: Voyages from the Subcontinent",
            );
            expect(ch1.image).toBe(
                "/assets/images/cholera/wave-2/mek/mek_ch_01.jpg",
            );

            // Backward-compatible alias MEC -> MEK
            const fromMec = await loadDossier("cholera-series", "MEC");
            expect(fromMec).toHaveLength(14);
            expect(fromMec![0].id).toBe("mek-ch-01");
        });

        it("verifies all Wave 2 chapters have complete bilingual parity and valid structure", () => {
            const allDatasets = [
                WAVE_2_SECTORS.RUS,
                WAVE_2_SECTORS.GBR,
                WAVE_2_SECTORS.FRA,
                WAVE_2_SECTORS.USA,
                WAVE_2_SECTORS.MEK,
            ];

            allDatasets.forEach((dataset) => {
                expect(dataset.waveIndex).toBe(2);
                expect(dataset.chapters.length).toBeGreaterThanOrEqual(12);
                dataset.chapters.forEach((ch, idx) => {
                    expect(ch.id).toBe(
                        `${dataset.sectorId.toLowerCase()}-ch-${String(idx + 1).padStart(2, "0")}`,
                    );
                    expect(ch.chapterNumber).toBe(idx + 1);
                    expect(ch.title.id).toBeTruthy();
                    expect(ch.title.en).toBeTruthy();
                    expect(ch.date.id).toBeTruthy();
                    expect(ch.date.en).toBeTruthy();
                    expect(ch.flash.id).toBeTruthy();
                    expect(ch.flash.en).toBeTruthy();
                    expect(ch.virusProfile.agent).toBeTruthy();
                    expect(ch.virusProfile.vector).toBeTruthy();
                    expect(ch.virusProfile.incubation).toBeTruthy();
                    expect(ch.virusProfile.transmission).toBeTruthy();
                    expect(ch.description.id).toBeTruthy();
                    expect(ch.description.en).toBeTruthy();
                    expect(ch.image).toMatch(
                        new RegExp(
                            `^/assets/images/cholera/wave-2/${dataset.sectorId.toLowerCase()}/`,
                        ),
                    );
                });
            });
        });
    });

    describe("Cholera Wave 3 (1846–1860) - Multi-Sector Architecture & Registry", () => {
        it("verifies Wave 3 presence in CHOLERA_WAVES with 6 primary epicenters", () => {
            const wave3 = CHOLERA_WAVES.find((w) => w.id === "wave-3");
            expect(wave3).toBeDefined();
            expect(wave3?.waveIndex).toBe(2);
            expect(wave3?.waveNumber).toBe(3);
            expect(wave3?.pathogen).toContain("Vibrio cholerae");

            const epicenters = Object.keys(wave3!.primaryEpicenters);
            expect(epicenters).toEqual(
                expect.arrayContaining([
                    "GBR",
                    "RUS",
                    "USA",
                    "ITA",
                    "IND",
                    "LAT",
                ]),
            );
        });

        it("verifies WAVE_3_PRIMARY_SECTORS metadata and count", () => {
            expect(WAVE_3_PRIMARY_SECTORS).toHaveLength(6);
            const codes = WAVE_3_PRIMARY_SECTORS.map((s) => s.code);
            expect(codes).toEqual(["GBR", "RUS", "USA", "ITA", "IND", "LAT"]);
        });

        it("resolves sectors via getWave3Sector with aliases", () => {
            expect(getWave3Sector("GBR").sectorId).toBe("GBR");
            expect(getWave3Sector("LON").sectorId).toBe("GBR");
            expect(getWave3Sector("RUS").sectorId).toBe("RUS");
            expect(getWave3Sector("SEV").sectorId).toBe("RUS");
            expect(getWave3Sector("USA").sectorId).toBe("USA");
            expect(getWave3Sector("NYC").sectorId).toBe("USA");
            expect(getWave3Sector("ITA").sectorId).toBe("ITA");
            expect(getWave3Sector("FLO").sectorId).toBe("ITA");
            expect(getWave3Sector("NAP").sectorId).toBe("ITA");
            expect(getWave3Sector("IND").sectorId).toBe("IND");
            expect(getWave3Sector("CAL").sectorId).toBe("IND");
            expect(getWave3Sector("LAT").sectorId).toBe("LAT");
            expect(getWave3Sector("PAN").sectorId).toBe("LAT");
            expect(getWave3Sector("CRC").sectorId).toBe("LAT");
            expect(getWave3Sector("WAVE-3").sectorId).toBe("GBR");
        });

        it("loads complete dossiers for all 6 Wave 3 sectors via loadDossier", async () => {
            const gbr = await loadDossier("cholera-1854", "GBR");
            expect(gbr).not.toBeNull();
            expect(gbr).toHaveLength(16);
            expect(gbr![0].id).toBe("gbr-ch-01");
            expect(gbr![0].image).toBe(
                "/assets/images/cholera/wave-3/gbr/gbr_ch_01.jpg",
            );

            const rus = await loadDossier("cholera-1854", "RUS");
            expect(rus).not.toBeNull();
            expect(rus).toHaveLength(15);
            expect(rus![0].id).toBe("rus-ch-01");

            const usa = await loadDossier("cholera-1854", "USA");
            expect(usa).not.toBeNull();
            expect(usa).toHaveLength(15);
            expect(usa![0].id).toBe("usa-ch-01");

            const ita = await loadDossier("cholera-1854", "ITA");
            expect(ita).not.toBeNull();
            expect(ita).toHaveLength(13);
            expect(ita![0].id).toBe("ita-ch-01");

            const ind = await loadDossier("cholera-1854", "IND");
            expect(ind).not.toBeNull();
            expect(ind).toHaveLength(14);
            expect(ind![0].id).toBe("ind-ch-01");

            const lat = await loadDossier("cholera-1854", "LAT");
            expect(lat).not.toBeNull();
            expect(lat).toHaveLength(13);
            expect(lat![0].id).toBe("lat-ch-01");

            // Also test with cholera-series and waveIndex: 2
            const viaSeries = await loadDossier("cholera-series", "GBR", 2);
            expect(viaSeries).toHaveLength(16);
            expect(viaSeries![0].id).toBe("gbr-ch-01");

            // Direct cholera-1854 pandemic ID loading
            const via1854 = await loadDossier("cholera-1854", "ita");
            expect(via1854).toHaveLength(13);
            expect(via1854![4].id).toBe("ita-ch-05");
            expect(via1854![4].title.en).toBe(
                "Discovery of 'Vibrio cholera': The Comma Bacillus",
            );
        });

        it("verifies all 86 chapters across Wave 3 have complete bilingual parity and valid structure", () => {
            const allDatasets = [
                WAVE_3_SECTORS.GBR,
                WAVE_3_SECTORS.RUS,
                WAVE_3_SECTORS.USA,
                WAVE_3_SECTORS.ITA,
                WAVE_3_SECTORS.IND,
                WAVE_3_SECTORS.LAT,
            ];

            let totalChapters = 0;
            allDatasets.forEach((dataset) => {
                expect(dataset.waveIndex).toBe(3);
                expect(dataset.chapters.length).toBeGreaterThanOrEqual(13);
                totalChapters += dataset.chapters.length;

                dataset.chapters.forEach((ch, idx) => {
                    expect(ch.id).toBe(
                        `${dataset.sectorId.toLowerCase()}-ch-${String(idx + 1).padStart(2, "0")}`,
                    );
                    expect(ch.chapterNumber).toBe(idx + 1);
                    expect([
                        "milestone",
                        "standard",
                        "side_story",
                        "summary",
                    ]).toContain(ch.type);
                    expect(ch.title.id).toBeTruthy();
                    expect(ch.title.en).toBeTruthy();
                    expect(ch.date.id).toBeTruthy();
                    expect(ch.date.en).toBeTruthy();
                    expect(ch.flash.id).toBeTruthy();
                    expect(ch.flash.en).toBeTruthy();
                    expect(ch.virusProfile.agent).toBeTruthy();
                    expect(ch.virusProfile.vector).toBeTruthy();
                    expect(ch.virusProfile.incubation).toBeTruthy();
                    expect(ch.virusProfile.transmission).toBeTruthy();
                    expect(ch.description.id).toBeTruthy();
                    expect(ch.description.en).toBeTruthy();
                    expect(ch.image).toMatch(
                        new RegExp(
                            `^/assets/images/cholera/wave-3/${dataset.sectorId.toLowerCase()}/`,
                        ),
                    );
                });
            });
            expect(totalChapters).toBe(86);
        });
    });

    describe("Wave 4: Complete Organic Narrative Architecture (1863–1875 AD)", () => {
        it("registers all 7 primary sectors for Wave 4 with valid metadata and unique beacon colors", () => {
            expect(WAVE_4_PRIMARY_SECTORS).toHaveLength(7);
            const codes = WAVE_4_PRIMARY_SECTORS.map((s) => s.code);
            expect(codes).toEqual([
                "MEK",
                "EGY",
                "GBR",
                "USA",
                "RUS",
                "ZAN",
                "SAM",
            ]);

            const wave4 = CHOLERA_WAVES[3];
            expect(wave4.id).toBe("wave-4");
            expect(wave4.waveIndex).toBe(3);
            expect(wave4.waveNumber).toBe(4);

            const epicenters = Object.values(wave4.primaryEpicenters);
            expect(epicenters).toHaveLength(7);

            // Ensure unique beacon colors
            const uniqueColors = new Set(epicenters.map((e) => e.beaconColor));
            expect(uniqueColors.size).toBe(epicenters.length);
        });

        it("resolves primary sectors and aliases via getWave4Sector", () => {
            // Direct codes
            expect(getWave4Sector("MEK").sectorId).toBe("MEK");
            expect(getWave4Sector("EGY").sectorId).toBe("EGY");
            expect(getWave4Sector("GBR").sectorId).toBe("GBR");
            expect(getWave4Sector("USA").sectorId).toBe("USA");
            expect(getWave4Sector("RUS").sectorId).toBe("RUS");
            expect(getWave4Sector("ZAN").sectorId).toBe("ZAN");
            expect(getWave4Sector("SAM").sectorId).toBe("SAM");

            // Backward-compatible aliases
            expect(getWave4Sector("MEC").sectorId).toBe("MEK");
            expect(getWave4Sector("CAI").sectorId).toBe("EGY");
            expect(getWave4Sector("ALX").sectorId).toBe("EGY");
            expect(getWave4Sector("LON").sectorId).toBe("GBR");
            expect(getWave4Sector("NYC").sectorId).toBe("USA");
            expect(getWave4Sector("STP").sectorId).toBe("RUS");
            expect(getWave4Sector("SWA").sectorId).toBe("ZAN");
            expect(getWave4Sector("PRG").sectorId).toBe("SAM");
            expect(getWave4Sector("ARG").sectorId).toBe("SAM");
            expect(getWave4Sector("BRA").sectorId).toBe("SAM");

            // Default fallbacks
            expect(getWave4Sector(undefined).sectorId).toBe("MEK");
            expect(getWave4Sector("WAVE-4").sectorId).toBe("MEK");
            expect(getWave4Sector("UNKNOWN_SECTOR").sectorId).toBe("MEK");
        });

        it("validates chapter schema and bilingual parity across all 7 Wave 4 sectors (93 total chapters)", () => {
            const sectors = ["MEK", "EGY", "GBR", "USA", "RUS", "ZAN", "SAM"];
            const expectedCounts: Record<string, number> = {
                MEK: 14,
                EGY: 13,
                GBR: 15,
                USA: 14,
                RUS: 13,
                ZAN: 12,
                SAM: 12,
            };

            let totalChapters = 0;
            sectors.forEach((code) => {
                const dataset = WAVE_4_SECTORS[code];
                expect(dataset).toBeDefined();
                expect(dataset.waveIndex).toBe(4);
                expect(dataset.sectorId).toBe(code);
                expect(dataset.chapters).toHaveLength(expectedCounts[code]);
                totalChapters += dataset.chapters.length;

                dataset.chapters.forEach((ch, idx) => {
                    expect(ch.id).toBe(
                        `${code.toLowerCase()}-ch-${String(idx + 1).padStart(2, "0")}`,
                    );
                    expect(ch.chapterNumber).toBe(idx + 1);
                    expect([
                        "milestone",
                        "standard",
                        "side_story",
                        "summary",
                    ]).toContain(ch.type);
                    expect(ch.title.id).toBeTruthy();
                    expect(ch.title.en).toBeTruthy();
                    expect(ch.date.id).toBeTruthy();
                    expect(ch.date.en).toBeTruthy();
                    expect(ch.flash.id).toBeTruthy();
                    expect(ch.flash.en).toBeTruthy();
                    expect(ch.virusProfile.agent).toBeTruthy();
                    expect(ch.virusProfile.vector).toBeTruthy();
                    expect(ch.virusProfile.incubation).toBeTruthy();
                    expect(ch.virusProfile.transmission).toBeTruthy();
                    expect(ch.description.id).toBeTruthy();
                    expect(ch.description.en).toBeTruthy();
                    expect(ch.image).toMatch(
                        new RegExp(
                            `^/assets/images/cholera/wave-4/${code.toLowerCase()}/`,
                        ),
                    );
                });
            });
            expect(totalChapters).toBe(93);
        });
    });

    describe("Cholera Wave State Persistence & Multi-Wave Sector Disambiguation", () => {
        it("parses diverse wave query parameter formats via parseCholeraWaveParam", () => {
            expect(parseCholeraWaveParam("1")).toBe(0);
            expect(parseCholeraWaveParam("2")).toBe(1);
            expect(parseCholeraWaveParam("3")).toBe(2);
            expect(parseCholeraWaveParam("4")).toBe(3);
            expect(parseCholeraWaveParam("7")).toBe(6);
            expect(parseCholeraWaveParam("wave-1")).toBe(0);
            expect(parseCholeraWaveParam("wave-2")).toBe(1);
            expect(parseCholeraWaveParam("wave-3")).toBe(2);
            expect(parseCholeraWaveParam("wave-4")).toBe(3);
            expect(parseCholeraWaveParam("wave3")).toBe(2);
            expect(parseCholeraWaveParam("wave4")).toBe(3);
            expect(parseCholeraWaveParam("w1")).toBe(0);
            expect(parseCholeraWaveParam("w2")).toBe(1);
            expect(parseCholeraWaveParam("w3")).toBe(2);
            expect(parseCholeraWaveParam("w4")).toBe(3);
            expect(parseCholeraWaveParam("mecca-1863")).toBe(3);
            expect(parseCholeraWaveParam("john-snow-1854")).toBe(2);
            expect(parseCholeraWaveParam("jessore-1817")).toBe(0);
            expect(parseCholeraWaveParam(null)).toBeNull();
            expect(parseCholeraWaveParam(undefined)).toBeNull();
            expect(parseCholeraWaveParam("invalid")).toBeNull();
            expect(parseCholeraWaveParam("99")).toBeNull();
        });

        it("infers wave index from unique sector codes via inferWaveIndexFromSector", () => {
            // Wave 1 unique sectors
            expect(inferWaveIndexFromSector("JES")).toBe(0);
            expect(inferWaveIndexFromSector("BAT")).toBe(0);
            expect(inferWaveIndexFromSector("BSO")).toBe(0);

            // Wave 2 unique sectors
            expect(inferWaveIndexFromSector("FRA")).toBe(1);
            expect(inferWaveIndexFromSector("MEK")).toBe(1);

            // Wave 3 unique sectors
            expect(inferWaveIndexFromSector("ITA")).toBe(2);
            expect(inferWaveIndexFromSector("IND")).toBe(2);
            expect(inferWaveIndexFromSector("LAT")).toBe(2);
            expect(inferWaveIndexFromSector("FLO")).toBe(2);
            expect(inferWaveIndexFromSector("NAP")).toBe(2);
            expect(inferWaveIndexFromSector("SEV")).toBe(2);
            expect(inferWaveIndexFromSector("PAN")).toBe(2);
            expect(inferWaveIndexFromSector("CRC")).toBe(2);

            // Wave 4 unique sectors
            expect(inferWaveIndexFromSector("ZAN")).toBe(3);
            expect(inferWaveIndexFromSector("SWA")).toBe(3);
            expect(inferWaveIndexFromSector("SAM")).toBe(3);
            expect(inferWaveIndexFromSector("PRG")).toBe(3);
            expect(inferWaveIndexFromSector("EGY")).toBe(3);
            expect(inferWaveIndexFromSector("CAI")).toBe(3);

            // Wave 5 unique sectors
            expect(inferWaveIndexFromSector("HAM")).toBe(4);
            expect(inferWaveIndexFromSector("DEU")).toBe(4);
            expect(inferWaveIndexFromSector("ALN")).toBe(4);
            expect(inferWaveIndexFromSector("JPN")).toBe(4);
            expect(inferWaveIndexFromSector("TOK")).toBe(4);
            expect(inferWaveIndexFromSector("YOK")).toBe(4);
            expect(inferWaveIndexFromSector("NGS")).toBe(4);
        });

        it("disambiguates overlapping multi-wave sectors (GBR, RUS, USA) based on waveIndex", async () => {
            // GBR: Wave 2 (14 chapters) vs Wave 3 (16 chapters) vs Wave 4 (15 chapters)
            const gbrWave2 = await loadDossier("cholera-series", "GBR", 1);
            expect(gbrWave2).toHaveLength(14);
            expect(gbrWave2![0].image).toContain("wave-2");

            const gbrWave3 = await loadDossier("cholera-series", "GBR", 2);
            expect(gbrWave3).toHaveLength(16);
            expect(gbrWave3![0].image).toContain("wave-3");

            const gbrWave4 = await loadDossier("cholera-series", "GBR", 3);
            expect(gbrWave4).toHaveLength(15);
            expect(gbrWave4![0].image).toContain("wave-4");

            // RUS: Wave 2 (14 chapters) vs Wave 3 (15 chapters) vs Wave 4 (13 chapters)
            const rusWave2 = await loadDossier("cholera-series", "RUS", 1);
            expect(rusWave2).toHaveLength(14);
            expect(rusWave2![0].image).toContain("wave-2");

            const rusWave3 = await loadDossier("cholera-series", "RUS", 2);
            expect(rusWave3).toHaveLength(15);
            expect(rusWave3![0].image).toContain("wave-3");

            const rusWave4 = await loadDossier("cholera-series", "RUS", 3);
            expect(rusWave4).toHaveLength(13);
            expect(rusWave4![0].image).toContain("wave-4");

            // USA: Wave 2 (14 chapters) vs Wave 3 (15 chapters) vs Wave 4 (14 chapters)
            const usaWave2 = await loadDossier("cholera-series", "USA", 1);
            expect(usaWave2).toHaveLength(14);
            expect(usaWave2![0].image).toContain("wave-2");

            const usaWave3 = await loadDossier("cholera-series", "USA", 2);
            expect(usaWave3).toHaveLength(15);
            expect(usaWave3![0].image).toContain("wave-3");

            const usaWave4 = await loadDossier("cholera-series", "USA", 3);
            expect(usaWave4).toHaveLength(14);
            expect(usaWave4![0].image).toContain("wave-4");

            // Wave 4 dedicated pandemic ID (cholera-1863)
            const mek1863 = await loadDossier("cholera-1863", "MEK");
            expect(mek1863).toHaveLength(14);
            expect(mek1863![0].image).toContain("wave-4");

            const egy1863 = await loadDossier("cholera-1863", "EGY");
            expect(egy1863).toHaveLength(13);
            expect(egy1863![0].image).toContain("wave-4");

            const zan1863 = await loadDossier("cholera-1863", "ZAN");
            expect(zan1863).toHaveLength(12);
            expect(zan1863![0].image).toContain("wave-4");

            const sam1863 = await loadDossier("cholera-1863", "SAM");
            expect(sam1863).toHaveLength(12);
            expect(sam1863![0].image).toContain("wave-4");
        });
    });

    describe("Cholera Wave 5 (1881–1896 AD) - Architecture, Sectors, and Chapter Schema", () => {
        it("registers all 8 primary sectors with exact metadata and unique beacon colors", () => {
            expect(WAVE_5_PRIMARY_SECTORS).toHaveLength(8);

            const expectedSectorIds = [
                "HAM",
                "EGY",
                "IND",
                "RUS",
                "ITA",
                "FRA",
                "JPN",
                "USA",
            ];
            const primaryCodes = WAVE_5_PRIMARY_SECTORS.map((s) => s.code);
            expect(primaryCodes).toEqual(expectedSectorIds);

            // Primary epicenters from CHOLERA_WAVES[4]
            const wave5 = CHOLERA_WAVES[4];
            expect(wave5.id).toBe("wave-5");
            expect(wave5.waveNumber).toBe(5);
            expect(wave5.waveIndex).toBe(4);

            const epicenters = getEpicentersForPandemic("cholera-1881");
            const beaconColors = new Set<string>();

            expectedSectorIds.forEach((id) => {
                const epi = epicenters[id];
                expect(epi, `Missing epicenter for ${id}`).toBeDefined();
                expect(epi.beaconColor).toMatch(/^#[0-9a-f]{6}$/i);
                beaconColors.add(epi.beaconColor);
            });

            // Ensure all 8 beacon colors are unique
            expect(beaconColors.size).toBe(8);
        });

        it("contains all 8 sector datasets in WAVE_5_SECTORS including backward-compatible aliases", () => {
            const keys = Object.keys(WAVE_5_SECTORS);
            expect(keys).toContain("HAM");
            expect(keys).toContain("DEU");
            expect(keys).toContain("ALN");
            expect(keys).toContain("EGY");
            expect(keys).toContain("CAI");
            expect(keys).toContain("ALX");
            expect(keys).toContain("IND");
            expect(keys).toContain("CAL");
            expect(keys).toContain("BNG");
            expect(keys).toContain("RUS");
            expect(keys).toContain("STP");
            expect(keys).toContain("BAK");
            expect(keys).toContain("TSK");
            expect(keys).toContain("ITA");
            expect(keys).toContain("NAP");
            expect(keys).toContain("ROM");
            expect(keys).toContain("FRA");
            expect(keys).toContain("MAR");
            expect(keys).toContain("PAR");
            expect(keys).toContain("TLN");
            expect(keys).toContain("JPN");
            expect(keys).toContain("TOK");
            expect(keys).toContain("YOK");
            expect(keys).toContain("NGS");
            expect(keys).toContain("USA");
            expect(keys).toContain("NYC");
        });

        it("resolves alias codes correctly via getWave5Sector", () => {
            expect(getWave5Sector("DEU")).toBe(WAVE_5_SECTORS.HAM);
            expect(getWave5Sector("ALN")).toBe(WAVE_5_SECTORS.HAM);
            expect(getWave5Sector("CAI")).toBe(WAVE_5_SECTORS.EGY);
            expect(getWave5Sector("ALX")).toBe(WAVE_5_SECTORS.EGY);
            expect(getWave5Sector("CAL")).toBe(WAVE_5_SECTORS.IND);
            expect(getWave5Sector("BNG")).toBe(WAVE_5_SECTORS.IND);
            expect(getWave5Sector("STP")).toBe(WAVE_5_SECTORS.RUS);
            expect(getWave5Sector("BAK")).toBe(WAVE_5_SECTORS.RUS);
            expect(getWave5Sector("TSK")).toBe(WAVE_5_SECTORS.RUS);
            expect(getWave5Sector("NAP")).toBe(WAVE_5_SECTORS.ITA);
            expect(getWave5Sector("ROM")).toBe(WAVE_5_SECTORS.ITA);
            expect(getWave5Sector("MAR")).toBe(WAVE_5_SECTORS.FRA);
            expect(getWave5Sector("PAR")).toBe(WAVE_5_SECTORS.FRA);
            expect(getWave5Sector("TLN")).toBe(WAVE_5_SECTORS.FRA);
            expect(getWave5Sector("TOK")).toBe(WAVE_5_SECTORS.JPN);
            expect(getWave5Sector("YOK")).toBe(WAVE_5_SECTORS.JPN);
            expect(getWave5Sector("NGS")).toBe(WAVE_5_SECTORS.JPN);
            expect(getWave5Sector("NYC")).toBe(WAVE_5_SECTORS.USA);
            // Default fallback
            expect(getWave5Sector()).toBe(WAVE_5_SECTORS.HAM);
            expect(getWave5Sector("WAVE-5")).toBe(WAVE_5_SECTORS.HAM);
        });

        it("validates organic chapter count across all 8 sectors totaling exactly 104 chapters", () => {
            const ham = WAVE_5_SECTORS.HAM;
            const egy = WAVE_5_SECTORS.EGY;
            const ind = WAVE_5_SECTORS.IND;
            const rus = WAVE_5_SECTORS.RUS;
            const ita = WAVE_5_SECTORS.ITA;
            const fra = WAVE_5_SECTORS.FRA;
            const jpn = WAVE_5_SECTORS.JPN;
            const usa = WAVE_5_SECTORS.USA;

            expect(ham.chapters.length).toBe(14);
            expect(egy.chapters.length).toBe(13);
            expect(ind.chapters.length).toBe(13);
            expect(rus.chapters.length).toBe(14);
            expect(ita.chapters.length).toBe(13);
            expect(fra.chapters.length).toBe(12);
            expect(jpn.chapters.length).toBe(13);
            expect(usa.chapters.length).toBe(12);

            const totalChapters =
                ham.chapters.length +
                egy.chapters.length +
                ind.chapters.length +
                rus.chapters.length +
                ita.chapters.length +
                fra.chapters.length +
                jpn.chapters.length +
                usa.chapters.length;

            expect(totalChapters).toBe(104);
        });

        it("strictly enforces chapter schema, type diversity, and bilingual parity across all Wave 5 chapters", () => {
            const sectors = [
                WAVE_5_SECTORS.HAM,
                WAVE_5_SECTORS.EGY,
                WAVE_5_SECTORS.IND,
                WAVE_5_SECTORS.RUS,
                WAVE_5_SECTORS.ITA,
                WAVE_5_SECTORS.FRA,
                WAVE_5_SECTORS.JPN,
                WAVE_5_SECTORS.USA,
            ];

            const validTypes = [
                "milestone",
                "standard",
                "side_story",
                "summary",
            ];

            sectors.forEach((sector) => {
                expect(sector.waveIndex).toBe(5);
                expect(sector.sectorName.id.length).toBeGreaterThan(5);
                expect(sector.sectorName.en.length).toBeGreaterThan(5);
                expect(sector.coordinates).toHaveLength(2);

                const chapterTypesPresent = new Set<string>();

                sector.chapters.forEach((chapter, index) => {
                    expect(chapter.chapterNumber).toBe(index + 1);
                    expect(validTypes).toContain(chapter.type);
                    chapterTypesPresent.add(chapter.type);

                    // Bilingual fields must exist and be non-empty
                    expect(chapter.title.id.trim().length).toBeGreaterThan(3);
                    expect(chapter.title.en.trim().length).toBeGreaterThan(3);
                    expect(chapter.date.id.trim().length).toBeGreaterThan(2);
                    expect(chapter.date.en.trim().length).toBeGreaterThan(2);
                    expect(chapter.flash.id.trim().length).toBeGreaterThan(5);
                    expect(chapter.flash.en.trim().length).toBeGreaterThan(5);
                    expect(
                        chapter.description.id.trim().length,
                    ).toBeGreaterThan(20);
                    expect(
                        chapter.description.en.trim().length,
                    ).toBeGreaterThan(20);

                    // Virus profile
                    expect(
                        chapter.virusProfile.mutationType.id.trim().length,
                    ).toBeGreaterThan(3);
                    expect(
                        chapter.virusProfile.mutationType.en.trim().length,
                    ).toBeGreaterThan(3);
                    expect(
                        chapter.virusProfile.threatLevel.id.trim().length,
                    ).toBeGreaterThan(3);
                    expect(
                        chapter.virusProfile.threatLevel.en.trim().length,
                    ).toBeGreaterThan(3);
                    expect(
                        chapter.virusProfile.clinicalTarget.id.trim().length,
                    ).toBeGreaterThan(3);
                    expect(
                        chapter.virusProfile.clinicalTarget.en.trim().length,
                    ).toBeGreaterThan(3);

                    // Image convention: /assets/images/cholera/wave-5/{sector_id_lowercase}/{sector_id_lowercase}_ch_{XX}.jpg
                    const sectorCode = sector.sectorId.toLowerCase();
                    const expectedImgPattern = new RegExp(
                        `^/assets/images/cholera/wave-5/${sectorCode}/${sectorCode}_ch_\\d{2}\\.jpg$`,
                    );
                    expect(chapter.image).toMatch(expectedImgPattern);
                });

                // Ensure every sector exercises type diversity (at least 3 distinct types)
                expect(chapterTypesPresent.size).toBeGreaterThanOrEqual(3);
            });
        });

        it("loads Wave 5 sector dossiers via loadDossier for both dedicated and series routes", async () => {
            // Dedicated pandemic ID: cholera-1881
            const ham1881 = await loadDossier("cholera-1881", "HAM");
            expect(ham1881).toHaveLength(14);
            expect(ham1881![0].image).toContain("wave-5");

            const egy1881 = await loadDossier("cholera-1881", "EGY");
            expect(egy1881).toHaveLength(13);
            expect(egy1881![0].image).toContain("wave-5");

            const ind1881 = await loadDossier("cholera-1881", "IND");
            expect(ind1881).toHaveLength(13);
            expect(ind1881![0].image).toContain("wave-5");

            const rus1881 = await loadDossier("cholera-1881", "RUS");
            expect(rus1881).toHaveLength(14);
            expect(rus1881![0].image).toContain("wave-5");

            const ita1881 = await loadDossier("cholera-1881", "ITA");
            expect(ita1881).toHaveLength(13);
            expect(ita1881![0].image).toContain("wave-5");

            const fra1881 = await loadDossier("cholera-1881", "FRA");
            expect(fra1881).toHaveLength(12);
            expect(fra1881![0].image).toContain("wave-5");

            const jpn1881 = await loadDossier("cholera-1881", "JPN");
            expect(jpn1881).toHaveLength(13);
            expect(jpn1881![0].image).toContain("wave-5");

            const usa1881 = await loadDossier("cholera-1881", "USA");
            expect(usa1881).toHaveLength(12);
            expect(usa1881![0].image).toContain("wave-5");

            // Aliases via cholera-1881
            const deu1881 = await loadDossier("cholera-1881", "DEU");
            expect(deu1881).toHaveLength(14);

            const cal1881 = await loadDossier("cholera-1881", "CAL");
            expect(cal1881).toHaveLength(13);

            const tok1881 = await loadDossier("cholera-1881", "TOK");
            expect(tok1881).toHaveLength(13);

            // Series route with waveIndex === 4
            const rusSeriesW5 = await loadDossier("cholera-series", "RUS", 4);
            expect(rusSeriesW5).toHaveLength(14);
            expect(rusSeriesW5![0].image).toContain("wave-5");

            const usaSeriesW5 = await loadDossier("cholera-series", "USA", 4);
            expect(usaSeriesW5).toHaveLength(12);
            expect(usaSeriesW5![0].image).toContain("wave-5");

            const itaSeriesW5 = await loadDossier("cholera-series", "ITA", 4);
            expect(itaSeriesW5).toHaveLength(13);
            expect(itaSeriesW5![0].image).toContain("wave-5");

            const fraSeriesW5 = await loadDossier("cholera-series", "FRA", 4);
            expect(fraSeriesW5).toHaveLength(12);
            expect(fraSeriesW5![0].image).toContain("wave-5");

            const indSeriesW5 = await loadDossier("cholera-series", "IND", 4);
            expect(indSeriesW5).toHaveLength(13);
            expect(indSeriesW5![0].image).toContain("wave-5");

            const egySeriesW5 = await loadDossier("cholera-series", "EGY", 4);
            expect(egySeriesW5).toHaveLength(13);
            expect(egySeriesW5![0].image).toContain("wave-5");
        });
    });

    describe("Cholera Wave 6 (1899–1923 AD) Dynamic Architecture & Multi-Sector Integrity", () => {
        const sectorCodes = ["IND", "RUS", "PHL", "MEK", "ITA", "JPN"];

        it("defines all 6 primary sectors in CHOLERA_WAVES[5]", () => {
            const wave6 = CHOLERA_WAVES[5];
            expect(wave6.waveIndex).toBe(5);
            expect(wave6.waveNumber).toBe(6);
            expect(wave6.id).toBe("wave-6");

            const epicenters = Object.keys(wave6.primaryEpicenters);
            expect(epicenters).toEqual(expect.arrayContaining(sectorCodes));
            expect(epicenters).toHaveLength(6);

            // Verify unique beacon colors across all 6 sectors
            const beaconColors = new Set(
                Object.values(wave6.primaryEpicenters).map(
                    (e) => e.beaconColor,
                ),
            );
            expect(beaconColors.size).toBe(6);
        });

        it("contains 6 primary sectors in WAVE_6_PRIMARY_SECTORS matching required coordinates", () => {
            expect(WAVE_6_PRIMARY_SECTORS).toHaveLength(6);
            const codes = WAVE_6_PRIMARY_SECTORS.map((s) => s.code);
            expect(codes).toEqual(expect.arrayContaining(sectorCodes));
        });

        it("resolves primary sectors and aliases correctly via getWave6Sector", () => {
            expect(getWave6Sector("IND").sectorId).toBe("IND");
            expect(getWave6Sector("CAL").sectorId).toBe("IND");
            expect(getWave6Sector("BNG").sectorId).toBe("IND");

            expect(getWave6Sector("RUS").sectorId).toBe("RUS");
            expect(getWave6Sector("PET").sectorId).toBe("RUS");
            expect(getWave6Sector("STP").sectorId).toBe("RUS");

            expect(getWave6Sector("PHL").sectorId).toBe("PHL");
            expect(getWave6Sector("MAN").sectorId).toBe("PHL");

            expect(getWave6Sector("MEK").sectorId).toBe("MEK");
            expect(getWave6Sector("TUR").sectorId).toBe("MEK");
            expect(getWave6Sector("IST").sectorId).toBe("MEK");

            expect(getWave6Sector("ITA").sectorId).toBe("ITA");
            expect(getWave6Sector("NAP").sectorId).toBe("ITA");
            expect(getWave6Sector("USA").sectorId).toBe("ITA");
            expect(getWave6Sector("NYC").sectorId).toBe("ITA");

            expect(getWave6Sector("JPN").sectorId).toBe("JPN");
            expect(getWave6Sector("TOK").sectorId).toBe("JPN");
            expect(getWave6Sector("YOK").sectorId).toBe("JPN");

            // Fallback for default or unknown
            expect(getWave6Sector("WAVE-6").sectorId).toBe("IND");
            expect(getWave6Sector().sectorId).toBe("IND");
        });

        it("validates that all 6 sector datasets have correct chapter counts, bilingual parity, dual virusProfile, and type diversity", () => {
            const expectedCounts: Record<string, number> = {
                IND: 14,
                RUS: 15,
                PHL: 13,
                MEK: 12,
                ITA: 12,
                JPN: 12,
            };

            sectorCodes.forEach((secCode) => {
                const sector = WAVE_6_SECTORS[secCode];
                expect(sector).toBeDefined();
                expect(sector.sectorId).toBe(secCode);
                expect(sector.waveIndex).toBe(6);

                // Sector metadata parity
                expect(sector.sectorName.id).toBeTruthy();
                expect(sector.sectorName.en).toBeTruthy();
                expect(sector.coordinates).toHaveLength(2);

                // Chapter count validation
                expect(sector.chapters.length).toBe(expectedCounts[secCode]);

                const chapterTypesPresent = new Set<string>();

                sector.chapters.forEach((ch, idx) => {
                    expect(ch.chapterNumber).toBe(idx + 1);
                    expect([
                        "milestone",
                        "standard",
                        "side_story",
                        "summary",
                    ]).toContain(ch.type);
                    chapterTypesPresent.add(ch.type);

                    // Bilingual narrative parity
                    expect(ch.title.id).toBeTruthy();
                    expect(ch.title.en).toBeTruthy();
                    expect(ch.date.id).toBeTruthy();
                    expect(ch.date.en).toBeTruthy();
                    expect(ch.flash.id).toBeTruthy();
                    expect(ch.flash.en).toBeTruthy();
                    expect(ch.description.id).toBeTruthy();
                    expect(ch.description.en).toBeTruthy();

                    // Image convention
                    const secLower = secCode.toLowerCase();
                    const expectedImgPrefix = `/assets/images/cholera/wave-6/${secLower}/${secLower}_ch_`;
                    expect(ch.image).toContain(expectedImgPrefix);

                    // Dual schema virusProfile compliance
                    expect(ch.virusProfile).toBeDefined();
                    expect(ch.virusProfile.agent).toBeTruthy();
                    expect(ch.virusProfile.vector).toBeTruthy();
                    expect(ch.virusProfile.incubation).toBeTruthy();
                    expect(ch.virusProfile.transmission).toBeTruthy();

                    expect(ch.virusProfile.mutationType?.id).toBeTruthy();
                    expect(ch.virusProfile.mutationType?.en).toBeTruthy();
                    expect(ch.virusProfile.threatLevel?.id).toBeTruthy();
                    expect(ch.virusProfile.threatLevel?.en).toBeTruthy();
                    expect(ch.virusProfile.clinicalTarget?.id).toBeTruthy();
                    expect(ch.virusProfile.clinicalTarget?.en).toBeTruthy();
                });

                // Ensure every sector exercises type diversity (at least 3 distinct types)
                expect(chapterTypesPresent.size).toBeGreaterThanOrEqual(3);
            });
        });

        it("loads Wave 6 sector dossiers via loadDossier for both dedicated and series routes", async () => {
            // Dedicated pandemic ID: cholera-1899
            const ind1899 = await loadDossier("cholera-1899", "IND");
            expect(ind1899).toHaveLength(14);
            expect(ind1899![0].image).toContain("wave-6");

            const rus1899 = await loadDossier("cholera-1899", "RUS");
            expect(rus1899).toHaveLength(15);
            expect(rus1899![0].image).toContain("wave-6");

            const phl1899 = await loadDossier("cholera-1899", "PHL");
            expect(phl1899).toHaveLength(13);
            expect(phl1899![0].image).toContain("wave-6");

            const mek1899 = await loadDossier("cholera-1899", "MEK");
            expect(mek1899).toHaveLength(12);
            expect(mek1899![0].image).toContain("wave-6");

            const ita1899 = await loadDossier("cholera-1899", "ITA");
            expect(ita1899).toHaveLength(12);
            expect(ita1899![0].image).toContain("wave-6");

            const jpn1899 = await loadDossier("cholera-1899", "JPN");
            expect(jpn1899).toHaveLength(12);
            expect(jpn1899![0].image).toContain("wave-6");

            // Aliases via cholera-1899
            const cal1899 = await loadDossier("cholera-1899", "CAL");
            expect(cal1899).toHaveLength(14);

            const pet1899 = await loadDossier("cholera-1899", "PET");
            expect(pet1899).toHaveLength(15);

            const man1899 = await loadDossier("cholera-1899", "MAN");
            expect(man1899).toHaveLength(13);

            const tur1899 = await loadDossier("cholera-1899", "TUR");
            expect(tur1899).toHaveLength(12);

            const nap1899 = await loadDossier("cholera-1899", "NAP");
            expect(nap1899).toHaveLength(12);

            const tok1899 = await loadDossier("cholera-1899", "TOK");
            expect(tok1899).toHaveLength(12);

            // Series route with waveIndex === 5
            const indSeriesW6 = await loadDossier("cholera-series", "IND", 5);
            expect(indSeriesW6).toHaveLength(14);
            expect(indSeriesW6![0].image).toContain("wave-6");

            const rusSeriesW6 = await loadDossier("cholera-series", "RUS", 5);
            expect(rusSeriesW6).toHaveLength(15);
            expect(rusSeriesW6![0].image).toContain("wave-6");

            const phlSeriesW6 = await loadDossier("cholera-series", "PHL", 5);
            expect(phlSeriesW6).toHaveLength(13);
            expect(phlSeriesW6![0].image).toContain("wave-6");

            const mekSeriesW6 = await loadDossier("cholera-series", "MEK", 5);
            expect(mekSeriesW6).toHaveLength(12);
            expect(mekSeriesW6![0].image).toContain("wave-6");

            const itaSeriesW6 = await loadDossier("cholera-series", "ITA", 5);
            expect(itaSeriesW6).toHaveLength(12);
            expect(itaSeriesW6![0].image).toContain("wave-6");

            const jpnSeriesW6 = await loadDossier("cholera-series", "JPN", 5);
            expect(jpnSeriesW6).toHaveLength(12);
            expect(jpnSeriesW6![0].image).toContain("wave-6");
        });
    });

    describe("Cholera Wave 7 (1961–Present) Dynamic Architecture & Multi-Sector Integrity", () => {
        const sectorCodes = ["IDN", "IND", "PER", "ZWE", "HTI", "YEM"];

        it("defines all 6 primary sectors in CHOLERA_WAVES[6]", () => {
            const wave7 = CHOLERA_WAVES[6];
            expect(wave7.waveIndex).toBe(6);
            expect(wave7.waveNumber).toBe(7);
            expect(wave7.id).toBe("wave-7");

            const epicenters = Object.keys(wave7.primaryEpicenters);
            expect(epicenters).toEqual(expect.arrayContaining(sectorCodes));
            expect(epicenters).toHaveLength(6);

            // Verify unique beacon colors across all 6 sectors
            const beaconColors = new Set(
                Object.values(wave7.primaryEpicenters).map(
                    (e) => e.beaconColor,
                ),
            );
            expect(beaconColors.size).toBe(6);
        });

        it("contains 6 primary sectors in WAVE_7_PRIMARY_SECTORS matching required coordinates", () => {
            expect(WAVE_7_PRIMARY_SECTORS).toHaveLength(6);
            const codes = WAVE_7_PRIMARY_SECTORS.map((s) => s.code);
            expect(codes).toEqual(expect.arrayContaining(sectorCodes));
        });

        it("resolves primary sectors and aliases correctly via getWave7Sector", () => {
            expect(getWave7Sector("IDN").sectorId).toBe("IDN");
            expect(getWave7Sector("MAK").sectorId).toBe("IDN");
            expect(getWave7Sector("JAK").sectorId).toBe("IDN");

            expect(getWave7Sector("IND").sectorId).toBe("IND");
            expect(getWave7Sector("BGD").sectorId).toBe("IND");
            expect(getWave7Sector("DHK").sectorId).toBe("IND");
            expect(getWave7Sector("CAL").sectorId).toBe("IND");

            expect(getWave7Sector("PER").sectorId).toBe("PER");
            expect(getWave7Sector("LMA").sectorId).toBe("PER");
            expect(getWave7Sector("SAM").sectorId).toBe("PER");

            expect(getWave7Sector("ZWE").sectorId).toBe("ZWE");
            expect(getWave7Sector("HAR").sectorId).toBe("ZWE");
            expect(getWave7Sector("AFR").sectorId).toBe("ZWE");

            expect(getWave7Sector("HTI").sectorId).toBe("HTI");
            expect(getWave7Sector("PAP").sectorId).toBe("HTI");

            expect(getWave7Sector("YEM").sectorId).toBe("YEM");
            expect(getWave7Sector("SAN").sectorId).toBe("YEM");

            // Fallback for default or unknown
            expect(getWave7Sector("WAVE-7").sectorId).toBe("IDN");
            expect(getWave7Sector().sectorId).toBe("IDN");
        });

        it("validates that all 6 sector datasets have correct chapter counts, bilingual parity, dual virusProfile, and type diversity", () => {
            const expectedCounts: Record<string, number> = {
                IDN: 8,
                IND: 7,
                PER: 7,
                ZWE: 6,
                HTI: 7,
                YEM: 6,
            };

            sectorCodes.forEach((secCode) => {
                const sector = WAVE_7_SECTORS[secCode];
                expect(sector).toBeDefined();
                expect(sector.sectorId).toBe(secCode);
                expect(sector.waveIndex).toBe(7);

                // Sector metadata parity
                expect(sector.sectorName.id).toBeTruthy();
                expect(sector.sectorName.en).toBeTruthy();
                expect(sector.coordinates).toHaveLength(2);

                // Chapter count validation
                expect(sector.chapters.length).toBe(expectedCounts[secCode]);

                const chapterTypesPresent = new Set<string>();

                sector.chapters.forEach((ch, idx) => {
                    expect(ch.chapterNumber).toBe(idx + 1);
                    expect([
                        "milestone",
                        "standard",
                        "side_story",
                        "summary",
                    ]).toContain(ch.type);
                    chapterTypesPresent.add(ch.type);

                    // Bilingual narrative parity
                    expect(ch.title.id).toBeTruthy();
                    expect(ch.title.en).toBeTruthy();
                    expect(ch.date.id).toBeTruthy();
                    expect(ch.date.en).toBeTruthy();
                    expect(ch.flash.id).toBeTruthy();
                    expect(ch.flash.en).toBeTruthy();
                    expect(ch.description.id).toBeTruthy();
                    expect(ch.description.en).toBeTruthy();

                    // Image convention
                    const secLower = secCode.toLowerCase();
                    const expectedImgPrefix = `/assets/images/cholera/wave-7/${secLower}/${secLower}_ch_`;
                    expect(ch.image).toContain(expectedImgPrefix);

                    // Dual schema virusProfile compliance
                    expect(ch.virusProfile).toBeDefined();
                    expect(ch.virusProfile.agent).toBeTruthy();
                    expect(ch.virusProfile.vector).toBeTruthy();
                    expect(ch.virusProfile.incubation).toBeTruthy();
                    expect(ch.virusProfile.transmission).toBeTruthy();

                    expect(ch.virusProfile.mutationType?.id).toBeTruthy();
                    expect(ch.virusProfile.mutationType?.en).toBeTruthy();
                    expect(ch.virusProfile.threatLevel?.id).toBeTruthy();
                    expect(ch.virusProfile.threatLevel?.en).toBeTruthy();
                    expect(ch.virusProfile.clinicalTarget?.id).toBeTruthy();
                    expect(ch.virusProfile.clinicalTarget?.en).toBeTruthy();
                });

                // Ensure every sector exercises type diversity (at least 3 distinct types)
                expect(chapterTypesPresent.size).toBeGreaterThanOrEqual(3);
            });
        });

        it("loads Wave 7 sector dossiers via loadDossier for both dedicated and series routes", async () => {
            // Dedicated pandemic ID: cholera-1961
            const idn1961 = await loadDossier("cholera-1961", "IDN");
            expect(idn1961).toHaveLength(8);
            expect(idn1961![0].image).toContain("wave-7");

            const ind1961 = await loadDossier("cholera-1961", "IND");
            expect(ind1961).toHaveLength(7);
            expect(ind1961![0].image).toContain("wave-7");

            const per1961 = await loadDossier("cholera-1961", "PER");
            expect(per1961).toHaveLength(7);
            expect(per1961![0].image).toContain("wave-7");

            const zwe1961 = await loadDossier("cholera-1961", "ZWE");
            expect(zwe1961).toHaveLength(6);
            expect(zwe1961![0].image).toContain("wave-7");

            const hti1961 = await loadDossier("cholera-1961", "HTI");
            expect(hti1961).toHaveLength(7);
            expect(hti1961![0].image).toContain("wave-7");

            const yem1961 = await loadDossier("cholera-1961", "YEM");
            expect(yem1961).toHaveLength(6);
            expect(yem1961![0].image).toContain("wave-7");

            // Aliases via cholera-1961
            const mak1961 = await loadDossier("cholera-1961", "MAK");
            expect(mak1961).toHaveLength(8);

            const bgd1961 = await loadDossier("cholera-1961", "BGD");
            expect(bgd1961).toHaveLength(7);

            const lma1961 = await loadDossier("cholera-1961", "LMA");
            expect(lma1961).toHaveLength(7);

            const har1961 = await loadDossier("cholera-1961", "HAR");
            expect(har1961).toHaveLength(6);

            const pap1961 = await loadDossier("cholera-1961", "PAP");
            expect(pap1961).toHaveLength(7);

            const san1961 = await loadDossier("cholera-1961", "SAN");
            expect(san1961).toHaveLength(6);

            // Series route with waveIndex === 6
            const idnSeriesW7 = await loadDossier("cholera-series", "IDN", 6);
            expect(idnSeriesW7).toHaveLength(8);
            expect(idnSeriesW7![0].image).toContain("wave-7");

            const indSeriesW7 = await loadDossier("cholera-series", "IND", 6);
            expect(indSeriesW7).toHaveLength(7);
            expect(indSeriesW7![0].image).toContain("wave-7");

            const perSeriesW7 = await loadDossier("cholera-series", "PER", 6);
            expect(perSeriesW7).toHaveLength(7);
            expect(perSeriesW7![0].image).toContain("wave-7");

            const zweSeriesW7 = await loadDossier("cholera-series", "ZWE", 6);
            expect(zweSeriesW7).toHaveLength(6);
            expect(zweSeriesW7![0].image).toContain("wave-7");

            const htiSeriesW7 = await loadDossier("cholera-series", "HTI", 6);
            expect(htiSeriesW7).toHaveLength(7);
            expect(htiSeriesW7![0].image).toContain("wave-7");

            const yemSeriesW7 = await loadDossier("cholera-series", "YEM", 6);
            expect(yemSeriesW7).toHaveLength(6);
            expect(yemSeriesW7![0].image).toContain("wave-7");
        });
    });

    describe("Spanish Flu 1918 (H1N1) - Telemetry, Surveillance & Intelligence Brief", () => {
        it("registers spanish-flu-1918 with active status, theme color #f59e0b, and rich clinical profile", () => {
            const spanishFlu = pandemics.find(
                (p: PandemicProfile) => p.id === "spanish-flu-1918",
            );
            expect(spanishFlu).toBeDefined();
            expect(spanishFlu?.status).toBe("active");
            expect(spanishFlu?.themeColor).toBe("#f59e0b");
            expect(spanishFlu?.haloHex).toBe("rgba(245, 158, 11, 0.45)");
            expect(spanishFlu?.name.en).toContain("Spanish Flu");
            expect(spanishFlu?.name.id).toContain("Flu Spanyol");
            expect(spanishFlu?.pathogenName).toContain("H1N1");
            expect(spanishFlu?.cameraInitialPosition).toBeDefined();
            expect(spanishFlu?.globalFatalities).toContain("50.000.000");

            // Clinical Profile
            expect(spanishFlu?.clinicalProfile).toBeDefined();
            const clinical = spanishFlu!.clinicalProfile!;
            expect(clinical.classification.text.id).toContain(
                "Orthomyxoviridae",
            );
            expect(clinical.classification.text.en).toContain("Hemagglutinin");
            expect(clinical.metrics.incubation.value).toBe("1 – 4 Hari");
            expect(clinical.metrics.receptor.value).toBe("Sialic Acid");
            expect(clinical.symptoms.text.id).toContain("heliotrope cyanosis");
            expect(clinical.symptoms.text.en).toContain("heliotrope cyanosis");
        });

        it("defines all 6 primary epicenters with unique differentiated beacon colors", () => {
            const epicenters = getEpicentersForPandemic("spanish-flu-1918");
            expect(Object.keys(epicenters).length).toBeGreaterThanOrEqual(6);

            const primaryKeys = ["US", "FR", "ES", "GB", "IN", "ID"];
            primaryKeys.forEach((key) => {
                expect(epicenters[key]).toBeDefined();
                expect(epicenters[key].status.en).toBe(
                    "ACTIVE DOSSIER // DECLASSIFIED",
                );
                expect(epicenters[key].coordinates.lat).toBeTypeOf("number");
                expect(epicenters[key].coordinates.lng).toBeTypeOf("number");
            });

            // Distinct beacon colors check
            const colors = primaryKeys.map((k) => epicenters[k].beaconColor);
            const uniqueColors = new Set(colors);
            expect(uniqueColors.size).toBe(primaryKeys.length);
        });

        it("resolves global surveillance catalog for Spanish Flu (15 territories)", () => {
            const surv = getSurveillanceForPandemic("spanish-flu-1918");
            expect(Object.keys(surv).length).toBeGreaterThanOrEqual(15);

            expect(surv.US).toBeDefined();
            expect(surv.FR).toBeDefined();
            expect(surv.GB).toBeDefined();
            expect(surv.ES).toBeDefined();
            expect(surv.DE).toBeDefined();
            expect(surv.IN).toBeDefined();
            expect(surv.ID).toBeDefined();
            expect(surv.IT).toBeDefined();
            expect(surv.RU).toBeDefined();
            expect(surv.BR).toBeDefined();
            expect(surv.JP).toBeDefined();
            expect(surv.ZA).toBeDefined();
            expect(surv.WS).toBeDefined();
            expect(surv.NZ).toBeDefined();
            expect(surv.CN).toBeDefined();

            expect(surv.WS.fatalities).toBe(8500);
            expect(surv.IN.fatalities).toBe(17500000);
        });

        it("resolves territory interaction without data bleed for Spanish Flu era", () => {
            // Primary Epicenters
            const usInteraction = getCountryInteraction(
                "spanish-flu-1918",
                "US",
            );
            expect(usInteraction?.type).toBe("epicenter");
            expect(usInteraction?.code).toBe("US");

            const usaInteraction = getCountryInteraction(
                "spanish-flu-1918",
                "USA",
            );
            expect(usaInteraction?.type).toBe("epicenter");
            expect(usaInteraction?.code).toBe("US");

            const inInteraction = getCountryInteraction(
                "spanish-flu-1918",
                "IN",
            );
            expect(inInteraction?.type).toBe("epicenter");
            expect(inInteraction?.code).toBe("IN");

            // Secondary Surveillance
            const deInteraction = getCountryInteraction(
                "spanish-flu-1918",
                "DE",
            );
            expect(deInteraction?.type).toBe("surveillance");
            expect(deInteraction?.code).toBe("DE");

            const brInteraction = getCountryInteraction(
                "spanish-flu-1918",
                "BRA",
            );
            expect(brInteraction?.type).toBe("surveillance");
            expect(brInteraction?.code).toBe("BR");

            // Non-relevant custom ancient codes (Justinian/Black Death/Cholera) return null
            expect(getCountryInteraction("spanish-flu-1918", "CPX")).toBeNull();
            expect(getCountryInteraction("spanish-flu-1918", "PEL")).toBeNull();
            expect(getCountryInteraction("spanish-flu-1918", "KAF")).toBeNull();
            expect(getCountryInteraction("spanish-flu-1918", "JES")).toBeNull();
            expect(getCountryInteraction("spanish-flu-1918", "HAM")).toBeNull();
        });
    });
});
