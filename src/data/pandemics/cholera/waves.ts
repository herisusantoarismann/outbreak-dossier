import { EpicenterMetadata } from "@/data/countriesConfig";
import { CountrySurveillanceData, GlobalExtremeRecord } from "@/types/journey";

export interface CholeraWave {
    waveIndex: number; // 0 to 6
    waveNumber: number; // 1 to 7
    id: string; // "wave-1", ..., "wave-7"
    slug: string;
    name: { id: string; en: string };
    shortLabel: string; // e.g. "W1", "W2", ..., "W7"
    subtitle: { id: string; en: string };
    yearRange: string;
    startYear: number;
    endYear: number | "present";
    pathogen: string;
    themeColor: string;
    haloHex: string;
    cameraPosition: {
        lat: number;
        lng: number;
        altitude: number;
    };
    primaryEpicenters: Record<string, EpicenterMetadata>;
    surveillance: Record<string, CountrySurveillanceData>;
    metrics: GlobalExtremeRecord[];
    historicalContext: { id: string; en: string };
    territoryMap: Record<
        string,
        { code: string; type: "epicenter" | "surveillance" }
    >;
}

export const CHOLERA_WAVES: CholeraWave[] = [
    // WAVE 1: 1817 – 1824
    {
        waveIndex: 0,
        waveNumber: 1,
        id: "wave-1",
        slug: "jessore-1817",
        name: {
            id: "Gelombang 1: Rawa Jessore & Ledakan Benggala",
            en: "Wave 1: Jessore Wetlands & Bengal Spillover",
        },
        shortLabel: "W1",
        subtitle: {
            id: "Delta Sungai Gangga ke Hindia Belanda & Timur Tengah (1817 – 1824 M)",
            en: "Ganges Delta to Dutch East Indies & Middle East (1817 – 1824 AD)",
        },
        yearRange: "1817 – 1824 M",
        startYear: 1817,
        endYear: 1824,
        pathogen: "Vibrio cholerae (Biotipe Klasik, Serogrup O1)",
        themeColor: "#06b6d4",
        haloHex: "rgba(6, 182, 212, 0.4)",
        cameraPosition: { lat: 23.1687, lng: 89.2173, altitude: 2.2 },
        primaryEpicenters: {
            JES: {
                code: "JES",
                iso3: "IND",
                name: {
                    id: "Jessore & Kalkuta (Delta Gangga & Episentrum 1817)",
                    en: "Jessore & Calcutta (The Bengal Delta & Inception 1817)",
                },
                sectorCode: "SECTOR // IND - JESSORE & CALCUTTA",
                coordinates: { lat: 23.1687, lng: 89.2173, altitude: 1.05 },
                beaconColor: "#06b6d4",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "Spillover kolera asiatik pertama di rawa-rawa Delta Gangga Jessore dan penyebaran cepat menyusuri Sungai Hooghly.",
                    en: "First Asiatic cholera spillover in the Ganges Delta wetlands of Jessore and rapid transmission down the Hooghly River.",
                },
                timelinePeriod: {
                    id: "Agustus 1817 M",
                    en: "August 1817 AD",
                },
            },
            BAT: {
                code: "BAT",
                iso3: "IDN",
                name: {
                    id: "Batavia & Jawa (Tragedi Kali Besar & Jalan Raya Pos 1821)",
                    en: "Batavia & Java (Kali Besar & The Great Post Road 1821)",
                },
                sectorCode: "SECTOR // IDN - BATAVIA & JAVA",
                coordinates: { lat: -6.2088, lng: 106.8456, altitude: 1.05 },
                beaconColor: "#0e7490",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "Kapal niaga dari Selat Malaka membawa wabah ke Batavia; 100.000+ jiwa tewas di pesisir dan pedalaman Pulau Jawa.",
                    en: "Vessels from Malacca Strait introduced cholera to Batavia; over 100,000 casualties across coastal and inland Java.",
                },
                timelinePeriod: {
                    id: "April 1821 M",
                    en: "April 1821 AD",
                },
            },
            BSO: {
                code: "BSO",
                iso3: "IRQ",
                name: {
                    id: "Basra & Muskat (Teluk Persia, Mesopotamia & Kaukasus 1821–1824)",
                    en: "Basra & Muscat (Persian Gulf, Mesopotamia & Caucasus 1821–1824)",
                },
                sectorCode: "SECTOR // MEA - BASRA & MUSCAT",
                coordinates: { lat: 30.5085, lng: 47.7804, altitude: 1.05 },
                beaconColor: "#155e75",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "Pendaratan kapal beras Bombay di Muskat dan invasi muara Basra, melumpuhkan kafilah Tigris-Efrat hingga Kaukasus.",
                    en: "Bombay rice vessels at Muscat and ingress through Basra delta, paralyzing Tigris-Euphrates caravans to the Caucasus.",
                },
                timelinePeriod: {
                    id: "Juli 1821 – 1824 M",
                    en: "July 1821 – 1824 AD",
                },
            },
        },
        surveillance: {
            BAG: {
                iso2: "BAG",
                name: {
                    id: "Baghdad (Mesopotamia / Utsmaniyah)",
                    en: "Baghdad (Mesopotamia / Ottoman)",
                },
                regionName: {
                    id: "Baghdad (Mesopotamia / Utsmaniyah)",
                    en: "Baghdad (Mesopotamia / Ottoman)",
                },
                continent: "Tigris-Euphrates // Ottoman Iraq",
                coordinates: [33.3152, 44.3661],
                fatalitiesEstimate: "18.000+ Jiwa",
                confirmedCases: "45.000+",
                fatalities: 18000,
                recoveryRate: "≈ 60%",
                peakPeriod: "Musim Panas 1821 M",
                peakWave: {
                    id: "Musim Panas 1821 M",
                    en: "Summer 1821 AD",
                },
                statusBadge: {
                    id: "KORIDOR MILITER SUNGAI TIGRIS",
                    en: "TIGRIS RIVER MILITARY CORRIDOR",
                },
                notes: {
                    id: "Wabah merambat menyusuri Sungai Tigris dari Basra ke Baghdad, memusnahkan garnisun militer Persia dan Utsmaniyah.",
                    en: "Outbreak advanced up the Tigris from Basra to Baghdad, paralyzing Ottoman and Persian military forces.",
                },
            },
            AST: {
                iso2: "AST",
                name: {
                    id: "Astrakhan (Muara Volga / Rusia)",
                    en: "Astrakhan (Volga Delta / Russia)",
                },
                regionName: {
                    id: "Astrakhan (Muara Volga / Rusia)",
                    en: "Astrakhan (Volga Delta / Russia)",
                },
                continent: "Caspian Sea // Russian Empire",
                coordinates: [46.3497, 48.04],
                fatalitiesEstimate: "≈ 5.000 Jiwa",
                confirmedCases: "12.000+",
                fatalities: 5000,
                recoveryRate: "≈ 58%",
                peakPeriod: "September 1823 M",
                peakWave: {
                    id: "September 1823 M",
                    en: "September 1823 AD",
                },
                statusBadge: {
                    id: "TITIK INVASIO PERTAMA EROPA TIMUR",
                    en: "FIRST EASTERN EUROPEAN INGRESS",
                },
                notes: {
                    id: "Kolera mencapai ambang pintu Eropa melalui jalur pelayaran Laut Kaspia sebelum terhenti oleh musim dingin ekstrem 1824.",
                    en: "Cholera reached the threshold of Europe via Caspian shipping before being halted by harsh winter 1824.",
                },
            },
        },
        metrics: [
            {
                id: "w1-jessore-toll",
                iso2: "IN",
                territoryCode: "JES",
                metricType: "mortality",
                label: {
                    id: "Mortalitas Awal Delta Gangga",
                    en: "Initial Ganges Delta Mortality",
                },
                countryName: {
                    id: "India (Rawa Jessore)",
                    en: "India (Jessore Wetlands)",
                },
                value: {
                    id: "10.000+ Jiwa / Pekan",
                    en: "10,000+ Deaths / Week",
                },
                context: {
                    id: "Wabah meluap dari rawa Jessore menyusuri Sungai Hooghly dan membakar seluruh kawasan Benggala.",
                    en: "Outbreak erupted from Jessore swamps down the Hooghly river, engulfing greater Bengal.",
                },
                coordinates: { lat: 23.1667, lng: 89.2167 },
            },
            {
                id: "w1-java-toll",
                iso2: "ID",
                territoryCode: "BAT",
                metricType: "density",
                label: {
                    id: "Korban Pesisir Pulau Jawa",
                    en: "Coastal Java Casualties",
                },
                countryName: {
                    id: "Hindia Belanda (Batavia)",
                    en: "Dutch East Indies (Batavia)",
                },
                value: {
                    id: "100.000+ Jiwa",
                    en: "100,000+ Deaths",
                },
                context: {
                    id: "Pendaratan galai dagang di Batavia pada April 1821 memicu kepanikan massal di sepanjang pesisir utara Jawa.",
                    en: "Trade vessel landings at Batavia in April 1821 triggered widespread mortality along northern Java.",
                },
                coordinates: { lat: -6.2088, lng: 106.8456 },
            },
            {
                id: "w1-trade-diffusion",
                iso2: "OM",
                territoryCode: "MUS",
                metricType: "containment",
                label: {
                    id: "Kecepatan Difusi Niaga Kolonial",
                    en: "Colonial Maritime Velocity",
                },
                countryName: {
                    id: "Kesultanan Oman (Muskat)",
                    en: "Sultanate of Oman (Muscat)",
                },
                value: {
                    id: "15 – 25 km / Hari",
                    en: "15 – 25 km / Day",
                },
                context: {
                    id: "Penyebaran didorong penuh oleh kapal kargo East India Company melintasi Samudra Hindia.",
                    en: "Spread was propelled across the Indian Ocean by armed East India Company merchantmen.",
                },
                coordinates: { lat: 23.588, lng: 58.3829 },
            },
        ],
        historicalContext: {
            id: "Pandemi Kolera Pertama meletus pada Agustus 1817 di Jessore dekat Calcutta. Untuk pertama kalinya, penyakit endemik delta Sungai Gangga melintasi batas benua berkat ekspansi garnisun militer British East India Company dan rute maritim kolonial ke Asia Tenggara, Teluk Persia, dan Kaukasus.",
            en: "The First Cholera Pandemic erupted in August 1817 at Jessore near Calcutta. For the first time, a regional Ganges Delta disease broke continental barriers through British East India Company military deployments and colonial shipping corridors toward Southeast Asia, the Persian Gulf, and the Caucasus.",
        },
        territoryMap: {
            JES: { code: "JES", type: "epicenter" },
            CAL: { code: "JES", type: "epicenter" },
            IN: { code: "JES", type: "epicenter" },
            IND: { code: "JES", type: "epicenter" },
            BAT: { code: "BAT", type: "epicenter" },
            ID: { code: "BAT", type: "epicenter" },
            IDN: { code: "BAT", type: "epicenter" },
            BSO: { code: "BSO", type: "epicenter" },
            MUS: { code: "BSO", type: "epicenter" },
            OM: { code: "BSO", type: "epicenter" },
            OMN: { code: "BSO", type: "epicenter" },
            IQ: { code: "BSO", type: "epicenter" },
            IRQ: { code: "BSO", type: "epicenter" },
            BAG: { code: "BAG", type: "surveillance" },
            AST: { code: "AST", type: "surveillance" },
            RU: { code: "AST", type: "surveillance" },
            RUS: { code: "AST", type: "surveillance" },
        },
    },

    // WAVE 2: 1829 – 1837
    {
        waveIndex: 1,
        waveNumber: 2,
        id: "wave-2",
        slug: "eurasia-1829",
        name: {
            id: "Gelombang 2: Penetrasi Eropa & Transatlantik",
            en: "Wave 2: European Penetration & Transatlantic Ingress",
        },
        shortLabel: "W2",
        subtitle: {
            id: "Invasi Volga, Keruntuhan Paris & Pendaratan New York (1829 – 1837 M)",
            en: "Volga Crossing, Fall of Paris & New York Landfall (1829 – 1837 AD)",
        },
        yearRange: "1829 – 1837 M",
        startYear: 1829,
        endYear: 1837,
        pathogen: "Vibrio cholerae (Biotipe Klasik)",
        themeColor: "#0891b2",
        haloHex: "rgba(8, 145, 178, 0.4)",
        cameraPosition: { lat: 55.7558, lng: 37.6173, altitude: 2.2 },
        primaryEpicenters: {
            RUS: {
                code: "RUS",
                iso3: "RUS",
                name: {
                    id: "Moskow & Volga (Kekaisaran Rusia)",
                    en: "Moscow & Volga (Russian Empire)",
                },
                sectorCode: "SECTOR // RUS - VOLGA CORDON BREACH",
                coordinates: { lat: 55.7558, lng: 37.6173, altitude: 1.05 },
                beaconColor: "#06b6d4",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "Kordon sanitasi militer Tsar gagal menahan kolera yang melompati garis pertahanan Sungai Volga ke Moskow dan St. Petersburg.",
                    en: "Tsarist military sanitary cordons collapsed as cholera leapt across Volga defensive lines to Moscow and St. Petersburg.",
                },
                timelinePeriod: {
                    id: "1829 – 1831 M",
                    en: "1829 – 1831 AD",
                },
            },
            GBR: {
                code: "GBR",
                iso3: "GBR",
                name: {
                    id: "Sunderland & London (Britania Raya)",
                    en: "Sunderland & London (Great Britain)",
                },
                sectorCode: "SECTOR // GBR - SUNDERLAND COAL PORT",
                coordinates: { lat: 54.9069, lng: -1.3838, altitude: 1.05 },
                beaconColor: "#0e7490",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "Masuk lewat kapal kargo batubara Baltik di Sunderland sebelum menyapu lembah industri dan pemukiman kumuh London.",
                    en: "Infiltrated via Baltic coal ships at Sunderland before engulfing industrial valleys and London's riverside slums.",
                },
                timelinePeriod: {
                    id: "Oktober 1831 – 1832 M",
                    en: "October 1831 – 1832 AD",
                },
            },
            FRA: {
                code: "FRA",
                iso3: "FRA",
                name: {
                    id: "Paris & Lembah Seine (Kerajaan Prancis)",
                    en: "Paris & Seine Valley (Kingdom of France)",
                },
                sectorCode: "SECTOR // FRA - PARIS TENEMENT CRISIS",
                coordinates: { lat: 48.8566, lng: 2.3522, altitude: 1.05 },
                beaconColor: "#0891b2",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "Karnaval Mi-Carême 1832: 20.000 warga tewas dalam 18 hari, termasuk Perdana Menteri Casimir Périer.",
                    en: "Mi-Carême Carnival 1832: 20,000 citizens perished in 18 days, including Prime Minister Casimir Périer.",
                },
                timelinePeriod: {
                    id: "Maret – Oktober 1832 M",
                    en: "March – October 1832 AD",
                },
            },
            USA: {
                code: "USA",
                iso3: "USA",
                name: {
                    id: "New York, Quebec & Kanal Erie (Amerika Utara)",
                    en: "New York, Quebec & Erie Canal (North America)",
                },
                sectorCode: "SECTOR // USA - HUDSON IMMIGRANT PACKETS",
                coordinates: { lat: 40.7128, lng: -74.006, altitude: 1.05 },
                beaconColor: "#155e75",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "Kapal imigran Irlandia menyeberangkan kolera ke Sungai Saint Lawrence, menyusuri Kanal Erie ke Five Points Manhattan dan Jalur Oregon.",
                    en: "Irish immigrant vessels ferried cholera to Saint Lawrence River, descending the Erie Canal to Manhattan's Five Points and the Oregon Trail.",
                },
                timelinePeriod: {
                    id: "Juni 1832 – 1834 M",
                    en: "June 1832 – 1834 AD",
                },
            },
            MEK: {
                code: "MEK",
                iso3: "SAU",
                name: {
                    id: "Mekkah & Hijaz (Koridor Jamaah Haji Utsmaniyah)",
                    en: "Mecca & Hijaz (Ottoman Hajj Pilgrimage Corridors)",
                },
                sectorCode: "SECTOR // MEA - MECCA HAJJ CRUCIBLE",
                coordinates: { lat: 21.4225, lng: 39.8262, altitude: 1.05 },
                beaconColor: "#d97706",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "Tragedi kolera di padang Arafah dan lembah Mina menewaskan 20.000+ jamaah haji, memicu penyebaran balik ke Timur Tengah dan Afrika.",
                    en: "Cholera tragedy across Arafat and Mina claimed over 20,000 pilgrims, sparking reverse dissemination across the Middle East and Africa.",
                },
                timelinePeriod: {
                    id: "Musim Haji 1831 & 1846 M",
                    en: "Hajj Seasons 1831 & 1846 AD",
                },
            },
        },
        surveillance: {
            STP: {
                iso2: "STP",
                name: {
                    id: "Saint Petersburg (Ibukota Tsar)",
                    en: "Saint Petersburg (Tsarist Capital)",
                },
                regionName: {
                    id: "Saint Petersburg (Ibukota Tsar)",
                    en: "Saint Petersburg (Tsarist Capital)",
                },
                continent: "Baltic // Russian Empire",
                coordinates: [59.9343, 30.3351],
                fatalitiesEstimate: "≈ 10.000 Jiwa",
                confirmedCases: "22.000+",
                fatalities: 10000,
                recoveryRate: "≈ 55%",
                peakPeriod: "Juni 1831 M",
                peakWave: { id: "Juni 1831 M", en: "June 1831 AD" },
                statusBadge: {
                    id: "PEMBERONTAKAN KERUSUHAN KOLERA",
                    en: "CHOLERA RIOT CIVIL UNREST",
                },
                notes: {
                    id: "Kepanikan massal memicu tuduhan bahwa dokter meracuni sumur air, berujung pada kerusuhan berdarah di Lapangan Sennaya.",
                    en: "Hysteria sparked conspiracy theories that doctors were poisoning wells, triggering bloody riots in Sennaya Square.",
                },
            },
        },
        metrics: [
            {
                id: "w2-paris-crisis",
                iso2: "FR",
                territoryCode: "FRA",
                metricType: "mortality",
                label: {
                    id: "Mortalitas Kilat Kota Paris",
                    en: "Paris Lightning Mortality",
                },
                countryName: {
                    id: "Prancis (Paris)",
                    en: "France (Paris)",
                },
                value: {
                    id: "20.000 Jiwa (18 Hari)",
                    en: "20,000 Deaths (18 Days)",
                },
                context: {
                    id: "Wabah musim semi 1832 melumpuhkan administrasi kerajaan dan memicu ketidakstabilan politik besar.",
                    en: "Spring 1832 epidemic paralyzed royal administration and catalyzed massive political destabilization.",
                },
                coordinates: { lat: 48.8566, lng: 2.3522 },
            },
            {
                id: "w2-transatlantic-hop",
                iso2: "US",
                territoryCode: "USA",
                metricType: "survival",
                label: {
                    id: "Penetrasi Dunia Baru",
                    en: "New World Ingress",
                },
                countryName: {
                    id: "Amerika Serikat (New York)",
                    en: "United States (New York)",
                },
                value: {
                    id: "3.500+ Tewas di Manhattan",
                    en: "3,500+ Dead in Manhattan",
                },
                context: {
                    id: "Ribuan warga kaya melarikan diri ke pedesaan meninggalkan kelas pekerja di permukiman Five Points.",
                    en: "Affluent citizens fled upstate leaving destitute immigrant labor trapped in Five Points slums.",
                },
                coordinates: { lat: 40.7128, lng: -74.006 },
            },
        ],
        historicalContext: {
            id: "Pandemi Kolera Kedua adalah pertama kalinya penyakit ini menembus jantung Eropa Barat dan melintasi Samudra Atlantik menuju Amerika Utara. Kegagalan kordon karantina militer Rusia dan kepanikan sosial di Paris serta London memicu kerusuhan kolera besar dan kesadaran awal akan krisis sanitasi perkotaan.",
            en: "The Second Cholera Pandemic marked the pathogen's first conquest of Western Europe and transatlantic leap to North America. The breakdown of Russian military cordons and societal panic in Paris and London provoked major riots and sparked early realization of urban sanitary vulnerability.",
        },
        territoryMap: {
            RUS: { code: "RUS", type: "epicenter" },
            MOS: { code: "RUS", type: "epicenter" },
            RU: { code: "RUS", type: "epicenter" },
            GBR: { code: "GBR", type: "epicenter" },
            LON: { code: "GBR", type: "epicenter" },
            GB: { code: "GBR", type: "epicenter" },
            UK: { code: "GBR", type: "epicenter" },
            FRA: { code: "FRA", type: "epicenter" },
            PAR: { code: "FRA", type: "epicenter" },
            FR: { code: "FRA", type: "epicenter" },
            USA: { code: "USA", type: "epicenter" },
            NYC: { code: "USA", type: "epicenter" },
            US: { code: "USA", type: "epicenter" },
            MEK: { code: "MEK", type: "epicenter" },
            MEC: { code: "MEK", type: "epicenter" },
            SA: { code: "MEK", type: "epicenter" },
            SAU: { code: "MEK", type: "epicenter" },
            STP: { code: "STP", type: "surveillance" },
        },
    },

    // WAVE 3: 1846 – 1860 (John Snow)
    {
        waveIndex: 2,
        waveNumber: 3,
        id: "wave-3",
        slug: "john-snow-1854",
        name: {
            id: "Gelombang 3: Pompa Soho & Fajar Epidemiologi",
            en: "Wave 3: The Soho Pump & Dawn of Epidemiology",
        },
        shortLabel: "W3",
        subtitle: {
            id: "Penyelidikan Dr. John Snow & Patahnnya Teori Miasma (1846 – 1860 M)",
            en: "Dr. John Snow's Investigation & Fall of Miasma Theory (1846 – 1860 AD)",
        },
        yearRange: "1846 – 1860 M",
        startYear: 1846,
        endYear: 1860,
        pathogen: "Vibrio cholerae (Biotipe Klasik O1)",
        themeColor: "#0891b2",
        haloHex: "rgba(8, 145, 178, 0.4)",
        cameraPosition: { lat: 51.5133, lng: -0.1366, altitude: 2.2 },
        primaryEpicenters: {
            GBR: {
                code: "GBR",
                iso3: "GBR",
                name: {
                    id: "London & Soho (Pompa Broad Street & Dr. John Snow)",
                    en: "London & Soho (Broad Street Pump & Dr. John Snow)",
                },
                sectorCode: "SECTOR // GBR - SOHO BROAD STREET GROUND ZERO",
                coordinates: { lat: 51.5133, lng: -0.1366, altitude: 1.05 },
                beaconColor: "#0891b2",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "Pemetaan spasial Dr. John Snow membuktikan air pompa Broad Street yang tercemar tinja memicu wabah.",
                    en: "Dr. John Snow's spatial map proved the fecal-contaminated Broad Street pump was the outbreak source.",
                },
                timelinePeriod: {
                    id: "Agustus – September 1854 M",
                    en: "August – September 1854 AD",
                },
            },
            RUS: {
                code: "RUS",
                iso3: "RUS",
                name: {
                    id: "Kekaisaran Rusia & Sevastopol (Front Perang Krimea)",
                    en: "Russian Empire & Sevastopol (Crimean War Front)",
                },
                sectorCode: "SECTOR // RUS - CRIMEAN WAR & SEVASTOPOL TRENCHES",
                coordinates: { lat: 44.6166, lng: 33.5254, altitude: 1.05 },
                beaconColor: "#0284c7",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "Kolera merenggut 1.000.000+ jiwa di Rusia dan melumpuhkan pasukan sekutu serta garnisun Sevastopol di Perang Krimea.",
                    en: "Cholera claimed over 1,000,000 lives in Russia and crippled allied armies and Sevastopol garrison in the Crimean War.",
                },
                timelinePeriod: {
                    id: "1847 – 1856 M",
                    en: "1847 – 1856 AD",
                },
            },
            USA: {
                code: "USA",
                iso3: "USA",
                name: {
                    id: "Amerika Utara (Demam Emas California & Jalur Oregon)",
                    en: "North America (California Gold Rush & Oregon Trail)",
                },
                sectorCode: "SECTOR // USA - GOLD RUSH & OREGON TRAIL",
                coordinates: { lat: 38.5816, lng: -121.4944, altitude: 1.05 },
                beaconColor: "#155e75",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "Pencari emas California menyebarkan kolera ke seluruh benua, menewaskan puluhan ribu orang dan Presiden Zachary Taylor.",
                    en: "California forty-niners spread cholera across the continent, claiming tens of thousands and President Zachary Taylor.",
                },
                timelinePeriod: {
                    id: "1848 – 1854 M",
                    en: "1848 – 1854 AD",
                },
            },
            ITA: {
                code: "ITA",
                iso3: "ITA",
                name: {
                    id: "Semenanjung Italia (Florence, Napoli & Penemuan Filippo Pacini)",
                    en: "Italian Peninsula (Florence, Naples & Filippo Pacini's Discovery)",
                },
                sectorCode: "SECTOR // ITA - FLORENCE SANTA MARIA NUOVA",
                coordinates: { lat: 43.7696, lng: 11.2558, altitude: 1.05 },
                beaconColor: "#06b6d4",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "Filippo Pacini menemukan dan menamai 'Vibrio cholera' di bawah mikroskop di Rumah Sakit Santa Maria Nuova Florence pada 1854.",
                    en: "Filippo Pacini discovered and named 'Vibrio cholera' under the microscope at Santa Maria Nuova Hospital in Florence in 1854.",
                },
                timelinePeriod: {
                    id: "1854 – 1855 M",
                    en: "1854 – 1855 AD",
                },
            },
            IND: {
                code: "IND",
                iso3: "IND",
                name: {
                    id: "Anak Benua India (Delta Benggala, Kumbh Mela & Samudra Hindia)",
                    en: "Indian Subcontinent (Bengal Delta, Kumbh Mela & Indian Ocean)",
                },
                sectorCode: "SECTOR // IND - GANGES DELTA RESERVOIR",
                coordinates: { lat: 22.5726, lng: 88.3639, altitude: 1.05 },
                beaconColor: "#14b8a6",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "Reservoir endemik alami Delta Benggala memicu gelombang baru pasca-monsun 1846, berlanjut ke barak sepoy dan Pemberontakan 1857.",
                    en: "Bengal Delta natural reservoir ignited fresh outbreaks post-1846 monsoon, spreading to sepoy cantonments and the 1857 Mutiny.",
                },
                timelinePeriod: {
                    id: "1846 – 1857 M",
                    en: "1846 – 1857 AD",
                },
            },
            LAT: {
                code: "LAT",
                iso3: "CRI",
                name: {
                    id: "Karibia & Amerika Tengah (Transito Panama, Kuba & Kosta Rika)",
                    en: "Caribbean & Central America (Panama Transit, Cuba & Costa Rica)",
                },
                sectorCode: "SECTOR // LAT - CENTRAL AMERICAN FILIBUSTER WAR",
                coordinates: { lat: 9.9281, lng: -84.0907, altitude: 1.05 },
                beaconColor: "#0ea5e9",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "Kolera menyapu jalur perlintasan emas Panama, perbudakan Kuba, dan Perang Filibuster 1856 yang memusnahkan 10% populasi Kosta Rika.",
                    en: "Cholera ravaged Panama Gold transit, Cuban slave plantations, and the 1856 Filibuster War eradicating 10% of Costa Rica's populace.",
                },
                timelinePeriod: {
                    id: "1850 – 1856 M",
                    en: "1850 – 1856 AD",
                },
            },
        },
        surveillance: {
            HAM: {
                iso2: "HAM",
                name: {
                    id: "Hamburg (Kekaisaran Jerman)",
                    en: "Hamburg (German Empire)",
                },
                regionName: {
                    id: "Hamburg (Kekaisaran Jerman)",
                    en: "Hamburg (German Empire)",
                },
                continent: "Elbe River // German Confederation",
                coordinates: [53.5511, 9.9937],
                fatalitiesEstimate: "≈ 10.000 Jiwa",
                confirmedCases: "25.000+",
                fatalities: 10000,
                recoveryRate: "≈ 60%",
                peakPeriod: "Gelombang Endemik Pelabuhan Sungai Elbe",
                peakWave: {
                    id: "Gelombang Endemik Pelabuhan Sungai Elbe",
                    en: "Elbe River Port Endemic Waves",
                },
                statusBadge: {
                    id: "PASOKAN AIR SUNGAI ELBE TANPA FILTRASI",
                    en: "UNFILTERED ELBE RIVER WATERWORKS",
                },
                notes: {
                    id: "Pelabuhan Hamburg menjadi gerbang masuk kolera ke Jerman utara melalui pasokan air Sungai Elbe yang tidak disaring.",
                    en: "Port of Hamburg served as northern Germany's gateway for cholera via unfiltered Elbe river water supplies.",
                },
            },
            CAI: {
                iso2: "CAI",
                name: {
                    id: "Kairo & Delta Nil (Mesir)",
                    en: "Cairo & Nile Delta (Egypt)",
                },
                regionName: {
                    id: "Kairo & Delta Nil (Mesir)",
                    en: "Cairo & Nile Delta (Egypt)",
                },
                continent: "Nile Delta // Ottoman Egypt",
                coordinates: [30.0444, 31.2357],
                fatalitiesEstimate: "40.000+ Jiwa",
                confirmedCases: "80.000+",
                fatalities: 40000,
                recoveryRate: "≈ 50%",
                peakPeriod: "1848 – 1855 M",
                peakWave: { id: "1848 – 1855 M", en: "1848 – 1855 AD" },
                statusBadge: {
                    id: "PERSIMPANGAN MARITIM TERUSAN & KAFILAH",
                    en: "MARITIME CROSSROADS & CARAVAN HUBS",
                },
                notes: {
                    id: "Wabah menyapu delta Sungai Nil dan kafilah haji; titik pertemuan rute militer dan pelayaran Terusan Suez.",
                    en: "Ravaged the Nile delta and pilgrimage caravans, serving as a maritime crossroads.",
                },
            },
            MEC: {
                iso2: "MEC",
                name: {
                    id: "Mekkah & Rute Haji Hijaz",
                    en: "Mecca & The Hijaz Pilgrimage Route",
                },
                regionName: {
                    id: "Mekkah & Rute Haji Hijaz",
                    en: "Mecca & The Hijaz Pilgrimage Route",
                },
                continent: "Hejaz // Arabian Peninsula",
                coordinates: [21.3891, 39.8579],
                fatalitiesEstimate: "15.000 – 30.000 Jiwa per Musim",
                confirmedCases: "50.000+",
                fatalities: 25000,
                recoveryRate: "≈ 50%",
                peakPeriod: "Musim Haji 1850-an",
                peakWave: {
                    id: "Musim Haji 1850-an",
                    en: "1850s Hajj Seasons",
                },
                statusBadge: {
                    id: "VEKTOR SUMUR UMUM & DISPERSAL REGIONAL",
                    en: "COMMUNAL WELL VECTORS & DISPERSAL",
                },
                notes: {
                    id: "Kepadatan jutaan peziarah dan sumber air sumur terbuka memicu penyebaran balik ke Timur Tengah dan Afrika Utara.",
                    en: "Crowds of pilgrims and shared wells amplified dissemination back toward the Levant and North Africa.",
                },
            },
            TOK: {
                iso2: "TOK",
                name: {
                    id: "Edo (Tokyo / Keshogunan Tokugawa)",
                    en: "Edo (Tokyo / Tokugawa Shogunate)",
                },
                regionName: {
                    id: "Edo (Tokyo / Keshogunan Tokugawa)",
                    en: "Edo (Tokyo / Tokugawa Shogunate)",
                },
                continent: "Kanto Plain // Tokugawa Japan",
                coordinates: [35.6762, 139.6503],
                fatalitiesEstimate: "100.000 – 200.000 Jiwa",
                confirmedCases: "300.000+",
                fatalities: 150000,
                recoveryRate: "≈ 50%",
                peakPeriod: "1858 M (Kedatangan Kapal Hitam Perry)",
                peakWave: {
                    id: "1858 M (Kedatangan Kapal Hitam Perry)",
                    en: "1858 AD (Arrival of Perry's Black Ships)",
                },
                statusBadge: {
                    id: "KORORI // PEMBUKAAN PAKSA PELABUHAN",
                    en: "KORORI // TREATY PORT INGRESS",
                },
                notes: {
                    id: "Dikenal di Jepang sebagai 'Korori'; masuk bersamaan dengan pembukaan paksa pelabuhan Jepang oleh armada Barat.",
                    en: "Known in Japan as 'Korori'; erupted following the opening of treaty ports by Western naval squadrons.",
                },
            },
        },
        metrics: [
            {
                id: "w3-snow-cluster",
                iso2: "GB",
                territoryCode: "LON",
                metricType: "mortality",
                label: {
                    id: "Klaster Pompa Broad Street",
                    en: "Broad Street Pump Cluster Deaths",
                },
                countryName: {
                    id: "Inggris (Soho / London)",
                    en: "United Kingdom (Soho / London)",
                },
                value: {
                    id: "616 Jiwa",
                    en: "616 Deaths",
                },
                context: {
                    id: "Ratusan kematian terkonsentrasi dalam radius 250 meter di sekitar satu pompa air umum di Soho.",
                    en: "Hundreds of deaths concentrated within 250m of a single contaminated pump in Soho.",
                },
                coordinates: { lat: 51.5133, lng: -0.1366 },
            },
            {
                id: "w3-dehydration",
                iso2: "IN",
                territoryCode: "CAL",
                metricType: "density",
                label: {
                    id: "Kecepatan Dehidrasi Fatal",
                    en: "Onset to Fatal Dehydration",
                },
                countryName: {
                    id: "India (Delta Gangga)",
                    en: "India (Ganges Delta)",
                },
                value: {
                    id: "< 12 Jam",
                    en: "< 12 Hours",
                },
                context: {
                    id: "Kehilangan hingga 1 liter cairan per jam memicu syok hipovolemik dan sianosis biru dalam hitungan jam.",
                    en: "Loss of up to 1L fluid per hour induced severe hypovolemic shock and cyanosis within hours.",
                },
                coordinates: { lat: 22.5726, lng: 88.3639 },
            },
            {
                id: "w3-steam-rail",
                iso2: "US",
                territoryCode: "NYC",
                metricType: "containment",
                label: {
                    id: "Kecepatan Difusi Transportasi Uap",
                    en: "Steam Engine Diffusion Velocity",
                },
                countryName: {
                    id: "Amerika Serikat (Pelabuhan New York)",
                    en: "United States (New York Harbor)",
                },
                value: {
                    id: "40 – 80 km / Hari",
                    en: "40 – 80 km / Day",
                },
                context: {
                    id: "Pandemi pertama yang menunggangi jaringan kereta api uap darat dan kapal uap transatlantik.",
                    en: "The first pandemic accelerated by transcontinental railways and steamships.",
                },
                coordinates: { lat: 40.7143, lng: -74.0005 },
            },
        ],
        historicalContext: {
            id: "Pandemi Kolera Ketiga menandai titik balik paling monumental dalam sejarah kedokteran modern. Dokter Dr. John Snow memetakan pola kematian di Soho, London dan membuktikan penularan berasal dari pompa air Broad Street yang tercemar tinja. Penemuan ini melahirkan disiplin epidemiologi modern.",
            en: "The Third Cholera Pandemic represents a monumental milestone in modern medical history. Dr. John Snow mapped mortality patterns in Soho, London, proving transmission originated from the fecal-contaminated Broad Street pump. This established the foundation of modern epidemiology.",
        },
        territoryMap: {
            GBR: { code: "GBR", type: "epicenter" },
            LON: { code: "GBR", type: "epicenter" },
            GB: { code: "GBR", type: "epicenter" },
            UK: { code: "GBR", type: "epicenter" },
            RUS: { code: "RUS", type: "epicenter" },
            SEV: { code: "RUS", type: "epicenter" },
            RU: { code: "RUS", type: "epicenter" },
            USA: { code: "USA", type: "epicenter" },
            NYC: { code: "USA", type: "epicenter" },
            US: { code: "USA", type: "epicenter" },
            ITA: { code: "ITA", type: "epicenter" },
            FLO: { code: "ITA", type: "epicenter" },
            NAP: { code: "ITA", type: "epicenter" },
            IT: { code: "ITA", type: "epicenter" },
            IND: { code: "IND", type: "epicenter" },
            CAL: { code: "IND", type: "epicenter" },
            IN: { code: "IND", type: "epicenter" },
            LAT: { code: "LAT", type: "epicenter" },
            PAN: { code: "LAT", type: "epicenter" },
            CRC: { code: "LAT", type: "epicenter" },
            CUB: { code: "LAT", type: "epicenter" },
            HAV: { code: "LAT", type: "epicenter" },
            CR: { code: "LAT", type: "epicenter" },
            PAR: { code: "ITA", type: "epicenter" }, // Backward-compatibility
            FR: { code: "ITA", type: "epicenter" },
            FRA: { code: "ITA", type: "epicenter" },
            HAM: { code: "HAM", type: "surveillance" },
            DE: { code: "HAM", type: "surveillance" },
            DEU: { code: "HAM", type: "surveillance" },
            CAI: { code: "CAI", type: "surveillance" },
            EG: { code: "CAI", type: "surveillance" },
            EGY: { code: "CAI", type: "surveillance" },
            MEC: { code: "MEC", type: "surveillance" },
            SA: { code: "MEC", type: "surveillance" },
            SAU: { code: "MEC", type: "surveillance" },
            TOK: { code: "TOK", type: "surveillance" },
            JP: { code: "TOK", type: "surveillance" },
            JPN: { code: "TOK", type: "surveillance" },
        },
    },

    // WAVE 4: 1863 – 1875
    {
        waveIndex: 3,
        waveNumber: 4,
        id: "wave-4",
        slug: "mecca-1863",
        name: {
            id: "Gelombang 4: Koridor Haji & Maritim Uap",
            en: "Wave 4: The Hajj Corridors & Steamship Dispersal",
        },
        shortLabel: "W4",
        subtitle: {
            id: "Tragedi Peziarah Hejaz, Mesir & Pesisir Mediterania (1863 – 1875 M)",
            en: "Hejaz Pilgrim Catastrophe, Egypt & Mediterranean Ports (1863 – 1875 AD)",
        },
        yearRange: "1863 – 1875 M",
        startYear: 1863,
        endYear: 1875,
        pathogen: "Vibrio cholerae (Biotipe Klasik)",
        themeColor: "#0284c7",
        haloHex: "rgba(2, 132, 199, 0.4)",
        cameraPosition: { lat: 21.3891, lng: 39.8579, altitude: 2.2 },
        primaryEpicenters: {
            MEK: {
                code: "MEK",
                iso3: "SAU",
                name: {
                    id: "Mekkah & Hijaz (Arab)",
                    en: "Mecca & Hijaz (Arabia)",
                },
                sectorCode: "SECTOR // MEK - HAJJ TRAGEDY & DISPERSAL",
                coordinates: { lat: 21.3891, lng: 39.8262, altitude: 1.05 },
                beaconColor: "#06b6d4",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "Musim haji 1865: 30.000 peziarah tewas; kepulangan lewat kapal uap memicu gelombang global.",
                    en: "1865 Hajj season: 30,000 pilgrims died; return voyages by steamship triggered global dispersal.",
                },
                timelinePeriod: { id: "Mei 1865 M", en: "May 1865 AD" },
            },
            EGY: {
                code: "EGY",
                iso3: "EGY",
                name: {
                    id: "Iskandariyah & Terusan Suez (Mesir)",
                    en: "Alexandria & Suez Canal (Egypt)",
                },
                sectorCode:
                    "SECTOR // EGY - SUEZ CANAL ENTRY & CONSTANTINOPLE CONF",
                coordinates: { lat: 31.2001, lng: 29.9187, altitude: 1.05 },
                beaconColor: "#0891b2",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "60.000 korban di Mesir, kepanikan eksodus Eropa, dan Konferensi Sanitasi Internasional 1866.",
                    en: "60,000 deaths in Egypt, European exodus panic, and the 1866 International Sanitary Conference.",
                },
                timelinePeriod: {
                    id: "Juni 1865 – 1866 M",
                    en: "June 1865 – 1866 AD",
                },
            },
            GBR: {
                code: "GBR",
                iso3: "GBR",
                name: {
                    id: "London Timur & Britania Raya",
                    en: "East London & Great Britain",
                },
                sectorCode: "SECTOR // GBR - EAST LONDON WATERWORKS CONDUIT",
                coordinates: { lat: 51.53, lng: -0.03, altitude: 1.05 },
                beaconColor: "#0284c7",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "Waduk Old Ford tercemar limbah Sungai Lea menewaskan 5.500 jiwa; pembuktian definitif William Farr.",
                    en: "Old Ford reservoir polluted by Lea sewage kills 5,500; William Farr's definitive proof.",
                },
                timelinePeriod: {
                    id: "Juli – November 1866 M",
                    en: "July – November 1866 AD",
                },
            },
            USA: {
                code: "USA",
                iso3: "USA",
                name: {
                    id: "New York & Lembah Mississippi (AS)",
                    en: "New York & Mississippi Valley (USA)",
                },
                sectorCode: "SECTOR // USA - TRANSCONTINENTAL & RIVER STEAMERS",
                coordinates: { lat: 40.7128, lng: -74.006, altitude: 1.05 },
                beaconColor: "#155e75",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "Infiltrasi kapal uap Atalanta ke Manhattan, penyebaran rel kereta, dan amukan di St. Louis.",
                    en: "Steamship Atalanta infiltrates Manhattan, railroad spread, and fury across St. Louis.",
                },
                timelinePeriod: { id: "1865 – 1873 M", en: "1865 – 1873 AD" },
            },
            RUS: {
                code: "RUS",
                iso3: "RUS",
                name: {
                    id: "Kekaisaran Rusia & Front Bohemia",
                    en: "Russian Empire & Bohemian Front",
                },
                sectorCode:
                    "SECTOR // RUS - BATTLEFIELD RETREAT & VOLGA VORTEX",
                coordinates: { lat: 59.9343, lng: 30.3351, altitude: 1.05 },
                beaconColor: "#0ea5e9",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "Wabah meletup pasca Pertempuran Königgrätz, menyapu Warsawa dan lembah Sungai Volga.",
                    en: "Outbreak erupts post Battle of Königgrätz, sweeping Warsaw and the Volga river basin.",
                },
                timelinePeriod: { id: "1866 – 1873 M", en: "1866 – 1873 AD" },
            },
            ZAN: {
                code: "ZAN",
                iso3: "TZA",
                name: {
                    id: "Zanzibar & Jalur Karavan Swahili",
                    en: "Zanzibar & Swahili Caravan Trails",
                },
                sectorCode: "SECTOR // EAF - ZANZIBAR CARAVAN INGRESS",
                coordinates: { lat: -6.1659, lng: 39.2026, altitude: 1.05 },
                beaconColor: "#0d9488",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "Muson timur laut membawa kolera ke Stone Town; 150.000 jiwa melayang di pedalaman Afrika Timur.",
                    en: "Northeast monsoon brings cholera to Stone Town; 150,000 perish in East African interior.",
                },
                timelinePeriod: { id: "1869 – 1871 M", en: "1869 – 1871 AD" },
            },
            SAM: {
                code: "SAM",
                iso3: "ARG",
                name: {
                    id: "Lembah Río de la Plata & Perang Aliansi Tiga",
                    en: "Río de la Plata Basin & Triple Alliance War",
                },
                sectorCode: "SECTOR // SAM - HUMAITA MARSHES & BUENOS AIRES",
                coordinates: { lat: -27.24, lng: -58.59, altitude: 1.05 },
                beaconColor: "#14b8a6",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "Kolera melumpuhkan pasukan perang di rawa Humaitá dan menyebar ke Buenos Aires dan pedalaman.",
                    en: "Cholera cripples warring troops in Humaitá marshes and spreads to Buenos Aires and interior.",
                },
                timelinePeriod: { id: "1867 – 1869 M", en: "1867 – 1869 AD" },
            },
        },
        surveillance: {
            IST: {
                iso2: "IST",
                name: {
                    id: "Konstantinopel (Kesultanan Utsmaniyah)",
                    en: "Constantinople (Ottoman Empire)",
                },
                regionName: {
                    id: "Konstantinopel (Kesultanan Utsmaniyah)",
                    en: "Constantinople (Ottoman Empire)",
                },
                continent: "Bosphorus // Ottoman Empire",
                coordinates: [41.0082, 28.9784],
                fatalitiesEstimate: "≈ 30.000 Jiwa",
                confirmedCases: "70.000+",
                fatalities: 30000,
                recoveryRate: "≈ 57%",
                peakPeriod: "Musim Panas 1865 M",
                peakWave: {
                    id: "Musim Panas 1865 M",
                    en: "Summer 1865 AD",
                },
                statusBadge: {
                    id: "KORIDOR MARITIM BOSPORUS",
                    en: "BOSPHORUS STRAIT MARITIME CORRIDOR",
                },
                notes: {
                    id: "Kapal uap dari Alexandria membawa kolera ke ibu kota Utsmaniyah, memicu pembentukan dewan sanitasi internasional.",
                    en: "Steamships from Alexandria introduced cholera to the Ottoman capital, prompting international sanitary councils.",
                },
            },
        },
        metrics: [
            {
                id: "w4-hajj-toll",
                iso2: "SA",
                territoryCode: "MEK",
                metricType: "mortality",
                label: {
                    id: "Kematian Peziarah Hejaz",
                    en: "Hejaz Pilgrim Fatalities",
                },
                countryName: {
                    id: "Arab Saudi (Mekkah)",
                    en: "Saudi Arabia (Mecca)",
                },
                value: {
                    id: "30.000+ dari 90.000",
                    en: "30,000+ of 90,000",
                },
                context: {
                    id: "Sepertiga peziarah wafat sebelum sempat menaiki kapal uap untuk kembali ke tanah air.",
                    en: "One third of all pilgrims died before boarding return steamships to their homelands.",
                },
                coordinates: { lat: 21.3891, lng: 39.8262 },
            },
        ],
        historicalContext: {
            id: "Pandemi Kolera Keempat dipercepat oleh kapal uap dan pembukaan Terusan Suez. Wabah besar di antara peziarah haji 1865 memicu Konferensi Sanitasi Internasional Konstantinopel 1866 yang menetapkan protokol karantina global pertama.",
            en: "The Fourth Cholera Pandemic was supercharged by steam navigation and Suez maritime expansion. The catastrophic 1865 Hajj outbreak catalyzed the 1866 International Sanitary Conference in Constantinople, creating the first modern global quarantine protocols.",
        },
        territoryMap: {
            MEK: { code: "MEK", type: "epicenter" },
            MEC: { code: "MEK", type: "epicenter" },
            SA: { code: "MEK", type: "epicenter" },
            SAU: { code: "MEK", type: "epicenter" },
            EGY: { code: "EGY", type: "epicenter" },
            CAI: { code: "EGY", type: "epicenter" },
            ALX: { code: "EGY", type: "epicenter" },
            EG: { code: "EGY", type: "epicenter" },
            GBR: { code: "GBR", type: "epicenter" },
            GB: { code: "GBR", type: "epicenter" },
            UK: { code: "GBR", type: "epicenter" },
            LON: { code: "GBR", type: "epicenter" },
            USA: { code: "USA", type: "epicenter" },
            US: { code: "USA", type: "epicenter" },
            NYC: { code: "USA", type: "epicenter" },
            RUS: { code: "RUS", type: "epicenter" },
            RU: { code: "RUS", type: "epicenter" },
            MOS: { code: "RUS", type: "epicenter" },
            STP: { code: "RUS", type: "epicenter" },
            ZAN: { code: "ZAN", type: "epicenter" },
            SWA: { code: "ZAN", type: "epicenter" },
            TZ: { code: "ZAN", type: "epicenter" },
            TZA: { code: "ZAN", type: "epicenter" },
            SAM: { code: "SAM", type: "epicenter" },
            PRG: { code: "SAM", type: "epicenter" },
            ARG: { code: "SAM", type: "epicenter" },
            BRA: { code: "SAM", type: "epicenter" },
            AR: { code: "SAM", type: "epicenter" },
            PY: { code: "SAM", type: "epicenter" },
            BR: { code: "SAM", type: "epicenter" },
            IST: { code: "IST", type: "surveillance" },
            TR: { code: "IST", type: "surveillance" },
            TUR: { code: "IST", type: "surveillance" },
        },
    },

    // WAVE 5: 1881 – 1896 (Robert Koch & Hamburg)
    {
        waveIndex: 4,
        waveNumber: 5,
        id: "wave-5",
        slug: "hamburg-koch-1881",
        name: {
            id: "Gelombang 5: Isolasi Robert Koch & Tragedi Elbe",
            en: "Wave 5: Robert Koch's Isolation & The Elbe Disaster",
        },
        shortLabel: "W5",
        subtitle: {
            id: "Penemuan Basil Kolera & Bencana Air Minum Hamburg (1881 – 1896 M)",
            en: "Discovery of Cholera Bacillus & Hamburg Water Crisis (1881 – 1896 AD)",
        },
        yearRange: "1881 – 1896 M",
        startYear: 1881,
        endYear: 1896,
        pathogen: "Vibrio cholerae (Biotipe Klasik / Basil Koma Koch 1883)",
        themeColor: "#0d9488",
        haloHex: "rgba(13, 148, 136, 0.4)",
        cameraPosition: { lat: 53.5511, lng: 9.9937, altitude: 2.2 },
        primaryEpicenters: {
            HAM: {
                code: "HAM",
                iso3: "DEU",
                name: {
                    id: "Hamburg (Kekaisaran Jerman)",
                    en: "Hamburg (German Empire)",
                },
                sectorCode: "SECTOR // DEU - ELBE UNFILTERED WATERWORKS",
                coordinates: { lat: 53.5511, lng: 9.9937, altitude: 1.05 },
                beaconColor: "#0891b2",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "Agustus 1892: Air Sungai Elbe yang tidak difilter membunuh 8.600 warga; tetangganya Altona selamat berkat filter pasir.",
                    en: "August 1892: Unfiltered Elbe river water killed 8,600 citizens; adjacent Altona was saved by sand filtration.",
                },
                timelinePeriod: {
                    id: "Agustus – Oktober 1892 M",
                    en: "August – October 1892 AD",
                },
            },
            EGY: {
                code: "EGY",
                iso3: "EGY",
                name: {
                    id: "Aleksandria & Delta Nil (Mesir)",
                    en: "Alexandria & Nile Delta (Egypt)",
                },
                sectorCode: "SECTOR // EGY - GERMAN & FRENCH EXPEDITIONS",
                coordinates: { lat: 31.2001, lng: 29.9187, altitude: 1.05 },
                beaconColor: "#06b6d4",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "Musim panas 1883: Damietta meledak, Robert Koch dan Louis Thuillier berlomba mengidentifikasi basil koma di Aleksandria.",
                    en: "Summer 1883: Damietta detonates, Robert Koch and Louis Thuillier race to identify the comma bacillus in Alexandria.",
                },
                timelinePeriod: { id: "1883 M", en: "1883 AD" },
            },
            IND: {
                code: "IND",
                iso3: "IND",
                name: {
                    id: "Kolkata & Benggala (Kemaharajaan Britania)",
                    en: "Kolkata & Bengal (British Raj)",
                },
                sectorCode:
                    "SECTOR // IND - KOCH PURE CULTURE & HAFFKINE VACCINE",
                coordinates: { lat: 22.5726, lng: 88.3639, altitude: 1.05 },
                beaconColor: "#0e7490",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "Koch mengonfirmasi isolasi biakan murni Vibrio cholerae pada 1884; Haffkine menggelar uji coba vaksin massal pada 1893–1895.",
                    en: "Koch confirmed pure culture isolation of Vibrio cholerae in 1884; Haffkine conducted mass vaccine field trials in 1893–1895.",
                },
                timelinePeriod: { id: "1883 – 1895 M", en: "1883 – 1895 AD" },
            },
            RUS: {
                code: "RUS",
                iso3: "RUS",
                name: {
                    id: "Baku, Kaspia, & Volga (Kekaisaran Rusia)",
                    en: "Baku, Caspian, & Volga (Russian Empire)",
                },
                sectorCode:
                    "SECTOR // RUS - TRANSCASPIAN RAIL & VOLGA STEAMERS",
                coordinates: { lat: 40.4093, lng: 49.8671, altitude: 1.05 },
                beaconColor: "#0284c7",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "1892: Jalur rel Transkaspia membawa kolera dari Persia ke kilang minyak Baku, menyulut kerusuhan Tashkent dan melanda Volga.",
                    en: "1892: Transcaspian railway channeled cholera from Persia into Baku oilfields, igniting Tashkent riots and sweeping the Volga.",
                },
                timelinePeriod: { id: "1892 – 1893 M", en: "1892 – 1893 AD" },
            },
            ITA: {
                code: "ITA",
                iso3: "ITA",
                name: {
                    id: "Napoli & Italia Selatan (Kerajaan Italia)",
                    en: "Naples & Southern Italy (Kingdom of Italy)",
                },
                sectorCode:
                    "SECTOR // ITA - SUBTERRANEAN FONDACO & RISANAMENTO",
                coordinates: { lat: 40.8518, lng: 14.2681, altitude: 1.05 },
                beaconColor: "#0ea5e9",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "September 1884: Fondaco bawah tanah Napoli memicu 7.000 kematian, mendorong Raja Umberto I merombak kota lewat Risanamento.",
                    en: "September 1884: Naples' subterranean tenements triggered 7,000 deaths, driving King Umberto I to reconstruct the city via the Risanamento.",
                },
                timelinePeriod: { id: "1884 – 1889 M", en: "1884 – 1889 AD" },
            },
            FRA: {
                code: "FRA",
                iso3: "FRA",
                name: {
                    id: "Toulon, Marseille, & Paris (Republik Prancis)",
                    en: "Toulon, Marseille, & Paris (French Republic)",
                },
                sectorCode: "SECTOR // FRA - LA SARTHE & PASTEUR INSTITUTE",
                coordinates: { lat: 43.1242, lng: 5.928, altitude: 1.05 },
                beaconColor: "#155e75",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "1884: Kapal transpor La Sarthe membawa kolera ke Toulon; murid Pasteur mengonfirmasi basil usus dan Haffkine menguji vaksin.",
                    en: "1884: Transport La Sarthe brought cholera to Toulon; Pasteur's disciples confirmed intestinal vibrio and Haffkine tested vaccines.",
                },
                timelinePeriod: { id: "1884 – 1893 M", en: "1884 – 1893 AD" },
            },
            JPN: {
                code: "JPN",
                iso3: "JPN",
                name: {
                    id: "Nagasaki, Yokohama, & Tokyo (Kekaisaran Jepang)",
                    en: "Nagasaki, Yokohama, & Tokyo (Empire of Japan)",
                },
                sectorCode: "SECTOR // JPN - EISEIKYOKU & NINOSHIMA QUARANTINE",
                coordinates: { lat: 35.4437, lng: 139.638, altitude: 1.05 },
                beaconColor: "#0d9488",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "1882–1895: Dari 108.000 kematian tahun 1886 menuju karantina militer Ninoshima Dr. Gotō Shinpei yang menapis 230.000 tentara.",
                    en: "1882–1895: From 108,000 deaths in 1886 to Dr. Gotō Shinpei's Ninoshima military quarantine screening 230,000 soldiers.",
                },
                timelinePeriod: { id: "1882 – 1895 M", en: "1882 – 1895 AD" },
            },
            USA: {
                code: "USA",
                iso3: "USA",
                name: {
                    id: "Pelabuhan New York & Swinburne Island (Amerika Serikat)",
                    en: "New York Harbor & Swinburne Island (United States)",
                },
                sectorCode:
                    "SECTOR // USA - HOFFMAN ISLAND & BIGGS BACTERIOLOGY",
                coordinates: { lat: 40.7128, lng: -74.006, altitude: 1.05 },
                beaconColor: "#14b8a6",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "September 1892: Dr. Hermann Biggs mendirikan laboratorium mikrobiologi kota pertama dan menahan kapal uap Hamburg di teluk.",
                    en: "September 1892: Dr. Hermann Biggs launched the first municipal bacteriology lab, halting Hamburg liners offshore.",
                },
                timelinePeriod: { id: "1892 – 1893 M", en: "1892 – 1893 AD" },
            },
        },
        surveillance: {
            ALN: {
                iso2: "ALN",
                name: {
                    id: "Altona (Prusia / Pembanding Sand-Filter)",
                    en: "Altona (Prussia / Sand-Filter Control)",
                },
                regionName: {
                    id: "Altona (Prusia / Pembanding Sand-Filter)",
                    en: "Altona (Prussia / Sand-Filter Control)",
                },
                continent: "Elbe River // German Empire",
                coordinates: [53.55, 9.9333],
                fatalitiesEstimate: "≈ 300 Jiwa (Terkendali)",
                confirmedCases: "1.000+",
                fatalities: 300,
                recoveryRate: "≈ 92%",
                peakPeriod: "Agustus 1892 M",
                peakWave: {
                    id: "Agustus 1892 M",
                    en: "August 1892 AD",
                },
                statusBadge: {
                    id: "BUKTI EPIDEMIOLOGIS FILTER PASIR",
                    en: "SAND FILTRATION CONTROL BENCHMARK",
                },
                notes: {
                    id: "Altona menggunakan sumber air sungai yang sama persis dengan Hamburg namun menyaringnya lewat pasir, menghasilkan tingkat kematian 6x lebih rendah.",
                    en: "Altona drew the exact same river water as Hamburg but filtered it through sand, yielding a 6-fold lower death rate.",
                },
            },
        },
        metrics: [
            {
                id: "w5-hamburg-mortality",
                iso2: "DE",
                territoryCode: "HAM",
                metricType: "mortality",
                label: {
                    id: "Kematian Bencana Hamburg 1892",
                    en: "1892 Hamburg Disaster Deaths",
                },
                countryName: {
                    id: "Jerman (Hamburg)",
                    en: "Germany (Hamburg)",
                },
                value: {
                    id: "8.605 Jiwa (2 Bulan)",
                    en: "8,605 Deaths (2 Months)",
                },
                context: {
                    id: "Kota pelabuhan terkaya Jerman hancur karena menolak memasang filter pasir demi menghemat anggaran belanja kota.",
                    en: "Germany's richest port was devastated because city fathers delayed sand filters to cut public spending.",
                },
                coordinates: { lat: 53.5511, lng: 9.9937 },
            },
            {
                id: "w5-koch-isolation",
                iso2: "EG",
                territoryCode: "EGY",
                metricType: "containment",
                label: {
                    id: "Validasi Teori Kuman Robert Koch",
                    en: "Robert Koch Germ Theory Proof",
                },
                countryName: {
                    id: "Mesir (Alexandria)",
                    en: "Egypt (Alexandria)",
                },
                value: {
                    id: "Desember 1883",
                    en: "December 1883",
                },
                context: {
                    id: "Isolasi basil berbentuk koma membungkam penganut miasma dan mengawali sains mikrobiologi medis modern.",
                    en: "Isolation of the comma bacillus conclusively silenced miasmatists and inaugurated modern bacteriology.",
                },
                coordinates: { lat: 30.0444, lng: 31.2357 },
            },
        ],
        historicalContext: {
            id: "Pandemi Kolera Kelima adalah era lahirnya bakteriologi modern. Robert Koch berhasil mengisolasi Vibrio cholerae pada 1883 di Alexandria dan Kolkata. Di Eropa, tragedi Hamburg 1892 membuktikan efektivitas filter pasir air minum dan mengakhiri perdebatan teori kuman versus miasma.",
            en: "The Fifth Cholera Pandemic marked the triumphant birth of modern bacteriology. Robert Koch successfully isolated Vibrio cholerae in 1883 in Alexandria and Kolkata. In Europe, the 1892 Hamburg catastrophe proved the efficacy of slow sand filtration, permanently settling the germ theory debate.",
        },
        territoryMap: {
            HAM: { code: "HAM", type: "epicenter" },
            DE: { code: "HAM", type: "epicenter" },
            DEU: { code: "HAM", type: "epicenter" },
            EGY: { code: "EGY", type: "epicenter" },
            EG: { code: "EGY", type: "epicenter" },
            CAI: { code: "EGY", type: "epicenter" },
            ALX: { code: "EGY", type: "epicenter" },
            IND: { code: "IND", type: "epicenter" },
            IN: { code: "IND", type: "epicenter" },
            CAL: { code: "IND", type: "epicenter" },
            BNG: { code: "IND", type: "epicenter" },
            RUS: { code: "RUS", type: "epicenter" },
            RU: { code: "RUS", type: "epicenter" },
            STP: { code: "RUS", type: "epicenter" },
            BAK: { code: "RUS", type: "epicenter" },
            TSK: { code: "RUS", type: "epicenter" },
            ITA: { code: "ITA", type: "epicenter" },
            IT: { code: "ITA", type: "epicenter" },
            NAP: { code: "ITA", type: "epicenter" },
            ROM: { code: "ITA", type: "epicenter" },
            FRA: { code: "FRA", type: "epicenter" },
            FR: { code: "FRA", type: "epicenter" },
            PAR: { code: "FRA", type: "epicenter" },
            MAR: { code: "FRA", type: "epicenter" },
            TLN: { code: "FRA", type: "epicenter" },
            JPN: { code: "JPN", type: "epicenter" },
            JP: { code: "JPN", type: "epicenter" },
            TOK: { code: "JPN", type: "epicenter" },
            YOK: { code: "JPN", type: "epicenter" },
            NGS: { code: "JPN", type: "epicenter" },
            USA: { code: "USA", type: "epicenter" },
            US: { code: "USA", type: "epicenter" },
            NYC: { code: "USA", type: "epicenter" },
            ALN: { code: "ALN", type: "surveillance" },
        },
    },

    // WAVE 6: 1899 – 1923
    {
        waveIndex: 5,
        waveNumber: 6,
        id: "wave-6",
        slug: "sanitary-revolution-1899",
        name: {
            id: "Gelombang 6: Revolusi Klorin & Pergolakan Rusia",
            en: "Wave 6: Chlorine Revolution & Russian Turmoil",
        },
        shortLabel: "W6",
        subtitle: {
            id: "Klorinasi Massal Pipa Air & Ledakan Pasca PD I (1899 – 1923 M)",
            en: "Municipal Chlorination & Post-WWI Eruptions (1899 – 1923 AD)",
        },
        yearRange: "1899 – 1923 M",
        startYear: 1899,
        endYear: 1923,
        pathogen: "Vibrio cholerae (Biotipe Klasik Akhir)",
        themeColor: "#0ea5e9",
        haloHex: "rgba(14, 165, 233, 0.4)",
        cameraPosition: { lat: 23.5, lng: 78.5, altitude: 2.2 },
        primaryEpicenters: {
            IND: {
                code: "IND",
                iso3: "IND",
                name: {
                    id: "Kolkata & Delta Benggala (Kemaharajaan Britania)",
                    en: "Kolkata & Bengal Delta (British Raj)",
                },
                sectorCode: "SECTOR // IND - ROGERS REHYDRATION & HAFFKINE LAB",
                coordinates: { lat: 22.5726, lng: 88.3639, altitude: 1.05 },
                beaconColor: "#06b6d4",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "Infus salin hipertonik Leonard Rogers memangkas mortalitas dari 60% ke 18% di tengah wabah ganda 1918.",
                    en: "Leonard Rogers' hypertonic saline infusions reduced mortality from 60% to 18% amid the 1918 dual pandemic.",
                },
                timelinePeriod: { id: "1899 – 1923 M", en: "1899 – 1923 AD" },
            },
            RUS: {
                code: "RUS",
                iso3: "RUS",
                name: {
                    id: "Petrograd & Volga (Kekaisaran Rusia & Uni Soviet)",
                    en: "Petrograd & Volga (Russian Empire & Soviet Union)",
                },
                sectorCode: "SECTOR // RUS - CIVIL WAR TRAINS & SEMASHKO",
                coordinates: { lat: 59.9343, lng: 30.3351, altitude: 1.05 },
                beaconColor: "#0284c7",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "Epidemi Neva 1908, kereta militer Perang Saudara Rusia, dan sentralisasi kesehatan Narkomzdrav Semashko.",
                    en: "1908 Neva outbreak, Russian Civil War troop trains, and centralized Semashko Narkomzdrav healthcare.",
                },
                timelinePeriod: { id: "1904 – 1923 M", en: "1904 – 1923 AD" },
            },
            PHL: {
                code: "PHL",
                iso3: "PHL",
                name: {
                    id: "Manila & Luzon (Kepulauan Filipina)",
                    en: "Manila & Luzon (Philippine Archipelago)",
                },
                sectorCode:
                    "SECTOR // PHL - MILITARY BIOMEDICINE & OSMEÑA WATERWORKS",
                coordinates: { lat: 14.5995, lng: 120.9842, altitude: 1.05 },
                beaconColor: "#0d9488",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "Wabah Perang Filipina-Amerika 1902–1904, sanitasi militer Dr. Victor Heiser, dan modernisasi air bersih Osmeña.",
                    en: "1902–1904 Philippine-American War epidemic, Dr. Victor Heiser's sanitary cordons, and Osmeña waterworks modernization.",
                },
                timelinePeriod: { id: "1902 – 1916 M", en: "1902 – 1916 AD" },
            },
            MEK: {
                code: "MEK",
                iso3: "TUR",
                name: {
                    id: "Hejaz, Çatalca, & Konstantinopel (Kekaisaran Utsmaniyah)",
                    en: "Hejaz, Çatalca, & Constantinople (Ottoman Empire)",
                },
                sectorCode:
                    "SECTOR // MEK - EL-TOR LAZARETTO & ÇATALCA TRENCHES",
                coordinates: { lat: 21.3891, lng: 39.8262, altitude: 1.05 },
                beaconColor: "#0891b2",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "Karantina haji El-Tor dan Camaran, jalur rel Hejaz, dan bencana kolera garis parit Çatalca Perang Balkan.",
                    en: "El-Tor & Kamaran pilgrimage quarantines, Hejaz Railway vector, and Çatalca Balkan War trench epidemic.",
                },
                timelinePeriod: { id: "1902 – 1919 M", en: "1902 – 1919 AD" },
            },
            ITA: {
                code: "ITA",
                iso3: "ITA",
                name: {
                    id: "Napoli & Koridor Atlantik (Kerajaan Italia & AS)",
                    en: "Naples & Atlantic Corridor (Kingdom of Italy & USA)",
                },
                sectorCode:
                    "SECTOR // ITA - NAPLES CENSORSHIP & NYC CARRIER SCREENING",
                coordinates: { lat: 40.8518, lng: 14.2681, altitude: 1.05 },
                beaconColor: "#0ea5e9",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "Resurgensi Napoli 1910–1911, isolasi karantina New York Dr. Doty, dan revolusi klorinasi air perkotaan permanen.",
                    en: "1910–1911 Naples resurgence, Dr. Doty's New York carrier screening, and the permanent municipal chlorination revolution.",
                },
                timelinePeriod: { id: "1910 – 1912 M", en: "1910 – 1912 AD" },
            },
            JPN: {
                code: "JPN",
                iso3: "JPN",
                name: {
                    id: "Tokyo, Yokohama, & Osaka (Kekaisaran Jepang)",
                    en: "Tokyo, Yokohama, & Osaka (Empire of Japan)",
                },
                sectorCode:
                    "SECTOR // JPN - KITASATO LAB & YODOBASHI WATERWORKS",
                coordinates: { lat: 35.6762, lng: 139.6503, altitude: 1.05 },
                beaconColor: "#14b8a6",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "Biosekuriti tentara Perang Rusia-Jepang 1904, karantina raksasa Ninoshima, dan instalasi air klorin Yodobashi.",
                    en: "1904 Russo-Japanese War army biosecurity, Ninoshima mass quarantine sieve, and Yodobashi municipal chlorination.",
                },
                timelinePeriod: { id: "1902 – 1922 M", en: "1902 – 1922 AD" },
            },
        },
        surveillance: {
            WAR: {
                iso2: "WAR",
                name: {
                    id: "Warsawa (Front Timur PD I)",
                    en: "Warsaw (WWI Eastern Front)",
                },
                regionName: {
                    id: "Warsawa (Front Timur PD I)",
                    en: "Warsaw (WWI Eastern Front)",
                },
                continent: "Vistula River // Eastern Europe",
                coordinates: [52.2297, 21.0122],
                fatalitiesEstimate: "≈ 15.000 Jiwa",
                confirmedCases: "35.000+",
                fatalities: 15000,
                recoveryRate: "≈ 57%",
                peakPeriod: "1914 – 1915 M",
                peakWave: { id: "1914 – 1915 M", en: "1914 – 1915 AD" },
                statusBadge: {
                    id: "MOBILISASI PASUKAN FRONT TIMUR",
                    en: "EASTERN FRONT TROOP MOBILIZATION",
                },
                notes: {
                    id: "Mobilisasi jutaan serdadu Rusia dan Jerman di parit Front Timur memicu infeksi air minum terbuka.",
                    en: "Mobilization of millions of Russian and German troops along Eastern Front trenches infected open water sources.",
                },
            },
        },
        metrics: [
            {
                id: "w6-india-toll",
                iso2: "IN",
                territoryCode: "IND",
                metricType: "mortality",
                label: {
                    id: "Korban Jiwa Anak Benua India",
                    en: "Indian Subcontinent Fatalities",
                },
                countryName: {
                    id: "India (Kolkata)",
                    en: "India (Kolkata)",
                },
                value: {
                    id: "800.000+ Jiwa",
                    en: "800,000+ Deaths",
                },
                context: {
                    id: "Gelombang kolera klasik besar terakhir sebelum disinfeksi klorin diadopsi secara global.",
                    en: "The last massive classical cholera surge before chemical chlorine disinfection became universal.",
                },
                coordinates: { lat: 22.5726, lng: 88.3639 },
            },
            {
                id: "w6-chlorination",
                iso2: "US",
                territoryCode: "NYC",
                metricType: "containment",
                label: {
                    id: "Revolusi Disinfeksi Klorin",
                    en: "Chlorination Clean Water Breakthrough",
                },
                countryName: {
                    id: "Eropa & Amerika Serikat",
                    en: "Western Municipal Waterworks",
                },
                value: {
                    id: "1908 M Onwards",
                    en: "1908 AD Onwards",
                },
                context: {
                    id: "Pemberian klorin pada air minum perkotaan melenyapkan kolera dari Eropa Barat dan Amerika Utara secara permanen.",
                    en: "Continuous chlorination of municipal water eliminated cholera from Western cities permanently.",
                },
                coordinates: { lat: 40.7143, lng: -74.0005 },
            },
        ],
        historicalContext: {
            id: "Pandemi Kolera Keenam adalah benteng pemisah antara dua era. Sementara perang dan keruntuhan sosial di Rusia dan India menelan ratusan ribu korban jiwa, penemuan disinfeksi klorin pada air pipa perkotaan berhasil memutus mata rantai transmisi kolera di negara-negara barat untuk selamanya.",
            en: "The Sixth Cholera Pandemic was the great historical dividing line. While war and social breakdown in Russia and India claimed hundreds of thousands, the advent of continuous municipal water chlorination permanently eradicated indigenous cholera from Western nations.",
        },
        territoryMap: {
            IND: { code: "IND", type: "epicenter" },
            CAL: { code: "IND", type: "epicenter" },
            IN: { code: "IND", type: "epicenter" },
            BNG: { code: "IND", type: "epicenter" },
            RUS: { code: "RUS", type: "epicenter" },
            PET: { code: "RUS", type: "epicenter" },
            STP: { code: "RUS", type: "epicenter" },
            RU: { code: "RUS", type: "epicenter" },
            PHL: { code: "PHL", type: "epicenter" },
            MAN: { code: "PHL", type: "epicenter" },
            PH: { code: "PHL", type: "epicenter" },
            MEK: { code: "MEK", type: "epicenter" },
            TUR: { code: "MEK", type: "epicenter" },
            IST: { code: "MEK", type: "epicenter" },
            MEC: { code: "MEK", type: "epicenter" },
            SA: { code: "MEK", type: "epicenter" },
            SAU: { code: "MEK", type: "epicenter" },
            ITA: { code: "ITA", type: "epicenter" },
            NAP: { code: "ITA", type: "epicenter" },
            IT: { code: "ITA", type: "epicenter" },
            EUR: { code: "ITA", type: "epicenter" },
            USA: { code: "ITA", type: "epicenter" },
            NYC: { code: "ITA", type: "epicenter" },
            US: { code: "ITA", type: "epicenter" },
            JPN: { code: "JPN", type: "epicenter" },
            TOK: { code: "JPN", type: "epicenter" },
            YOK: { code: "JPN", type: "epicenter" },
            JP: { code: "JPN", type: "epicenter" },
            WAR: { code: "WAR", type: "surveillance" },
            PL: { code: "WAR", type: "surveillance" },
            POL: { code: "WAR", type: "surveillance" },
        },
    },

    // WAVE 7: 1961 – Present (Sulawesi / El Tor)
    {
        waveIndex: 6,
        waveNumber: 7,
        id: "wave-7",
        slug: "sulawesi-el-tor-1961",
        name: {
            id: "Gelombang 7: Mutasi El Tor Sulawesi & Krisis Modern",
            en: "Wave 7: The Sulawesi El Tor Mutation & Modern Era",
        },
        shortLabel: "W7",
        subtitle: {
            id: "Muncul di Makassar, Menetap Global & Krisis Sanitasi (1961 – Sekarang)",
            en: "Emerged in Makassar, Global Persistence & Humanitarian Crises (1961 – Present)",
        },
        yearRange: "1961 – Sekarang",
        startYear: 1961,
        endYear: "present",
        pathogen: "Vibrio cholerae serogroup O1, biotype El Tor",
        themeColor: "#06b6d4",
        haloHex: "rgba(6, 182, 212, 0.45)",
        cameraPosition: { lat: -5.1477, lng: 119.4327, altitude: 2.2 },
        primaryEpicenters: {
            IDN: {
                code: "IDN",
                iso3: "IDN",
                name: {
                    id: "Makassar & Kepulauan Indonesia",
                    en: "Makassar & Indonesian Archipelago",
                },
                sectorCode: "SECTOR // IDN - EL TOR SULAWESI GROUND ZERO",
                coordinates: { lat: -5.1477, lng: 119.4327, altitude: 1.05 },
                beaconColor: "#06b6d4",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "Mei 1961: Biotipe El Tor yang lebih tangguh melompat keluar dari Sulawesi dan menginvasi seluruh dunia.",
                    en: "May 1961: The hardier El Tor biotype escaped Sulawesi, launching the longest pandemic in history.",
                },
                timelinePeriod: { id: "1961 – 1970 M", en: "1961 – 1970 AD" },
            },
            IND: {
                code: "IND",
                iso3: "IND",
                name: {
                    id: "Kolkata & Bangladesh (CRL Dhaka & O139)",
                    en: "Kolkata & Bangladesh (CRL Dhaka & O139)",
                },
                sectorCode: "SECTOR // IND - ORS DISCOVERY & O139 MUTATION",
                coordinates: { lat: 23.8103, lng: 90.4125, altitude: 1.05 },
                beaconColor: "#0284c7",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "Revolusi penemuan ORS Bongaon 1971, ekologi zooplankton Rita Colwell, dan mutasi O139 Bengal.",
                    en: "1971 Bongaon War ORS miracle, Rita Colwell zooplankton ecology, and the O139 Bengal mutation.",
                },
                timelinePeriod: { id: "1963 – 1993 M", en: "1963 – 1993 AD" },
            },
            PER: {
                code: "PER",
                iso3: "PER",
                name: {
                    id: "Lima & Pesisir Peru (Invasi Amerika Latin)",
                    en: "Lima & Coastal Peru (Latin American Surge)",
                },
                sectorCode:
                    "SECTOR // PER - 1991 PACIFIC INVASION & CEVICHE CRISIS",
                coordinates: { lat: -12.0464, lng: -77.0428, altitude: 1.05 },
                beaconColor: "#0d9488",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "Januari 1991: Setelah 100 tahun absen, kolera menginvasi Amerika Latin lewat muara pelabuhan Peru.",
                    en: "January 1991: After a century of absence, cholera reinvaded Latin America via Peruvian ports.",
                },
                timelinePeriod: { id: "1991 – 1993 M", en: "1991 – 1993 AD" },
            },
            ZWE: {
                code: "ZWE",
                iso3: "ZWE",
                name: {
                    id: "Harare (Zimbabwe & Afrika Sub-Sahara)",
                    en: "Harare (Zimbabwe & Sub-Saharan Africa)",
                },
                sectorCode: "SECTOR // ZWE - WATER PIPELINE COLLAPSE",
                coordinates: { lat: -17.8252, lng: 31.0335, altitude: 1.05 },
                beaconColor: "#155e75",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "Keruntuhan sistem pipa kota Harare 2008 memicu 100.000 kasus dan meluas ke Afrika Selatan.",
                    en: "Municipal infrastructure breakdown in Harare in 2008 caused 100,000 cases spilling into South Africa.",
                },
                timelinePeriod: { id: "2008 – 2009 M", en: "2008 – 2009 AD" },
            },
            HTI: {
                code: "HTI",
                iso3: "HTI",
                name: {
                    id: "Port-au-Prince & Sungai Artibonite (Haiti)",
                    en: "Port-au-Prince & Artibonite (Haiti)",
                },
                sectorCode: "SECTOR // HTI - POST-EARTHQUAKE OUTBREAK",
                coordinates: { lat: 18.5944, lng: -72.3074, altitude: 1.05 },
                beaconColor: "#0891b2",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "Oktober 2010: Kontaminasi Sungai Artibonite pasca-gempa memicu 820.000 kasus dan 10.000 kematian di Haiti.",
                    en: "October 2010: Post-earthquake river contamination triggered 820,000 cases and 10,000 deaths in Haiti.",
                },
                timelinePeriod: { id: "2010 – 2019 M", en: "2010 – 2019 AD" },
            },
            YEM: {
                code: "YEM",
                iso3: "YEM",
                name: {
                    id: "Sana'a & Al Hudaydah (Yaman)",
                    en: "Sana'a & Al Hudaydah (Yemen)",
                },
                sectorCode: "SECTOR // YEM - WARFARE COLLAPSE RECORD",
                coordinates: { lat: 15.3694, lng: 44.191, altitude: 1.05 },
                beaconColor: "#0e7490",
                status: {
                    id: "ARSIP AKTIF // DIDEKLASIFIKASI",
                    en: "ACTIVE DOSSIER // DECLASSIFIED",
                },
                synopsis: {
                    id: "Krisis kemanusiaan perang melahirkan wabah terbesar dalam sejarah modern dengan 2,5 juta kasus.",
                    en: "Humanitarian conflict created modern history's largest outbreak with over 2.5 million cases.",
                },
                timelinePeriod: {
                    id: "2016 – Sekarang",
                    en: "2016 – Present",
                },
            },
        },
        surveillance: {
            JAK: {
                iso2: "JAK",
                name: {
                    id: "Jakarta (Pintu Masuk El Tor Jawa)",
                    en: "Jakarta (El Tor Java Ingress)",
                },
                regionName: {
                    id: "Jakarta (Pintu Masuk El Tor Jawa)",
                    en: "Jakarta (El Tor Java Ingress)",
                },
                continent: "Java Sea // Indonesia",
                coordinates: [-6.2088, 106.8456],
                fatalitiesEstimate: "≈ 4.000 Jiwa",
                confirmedCases: "15.000+",
                fatalities: 4000,
                recoveryRate: "≈ 75%",
                peakPeriod: "1961 – 1962 M",
                peakWave: { id: "1961 – 1962 M", en: "1961 – 1962 AD" },
                statusBadge: {
                    id: "TRANSIT KAPAL LAUT SULAWESI-JAWA",
                    en: "SULAWESI-JAVA MARITIME TRANSIT",
                },
                notes: {
                    id: "Penyebaran maritim dari Makassar ke pelabuhan Tanjung Priok mengawali pergerakan El Tor ke seluruh kepulauan Nusantara.",
                    en: "Maritime transit from Makassar to Tanjung Priok initiated the El Tor wave throughout the Indonesian archipelago.",
                },
            },
        },
        metrics: [
            {
                id: "w7-asymptomatic",
                iso2: "ID",
                territoryCode: "IDN",
                metricType: "survival",
                label: {
                    id: "Rasio Karier Asimtomatik El Tor",
                    en: "El Tor Asymptomatic Carrier Ratio",
                },
                countryName: {
                    id: "Indonesia (Sulawesi Selatan)",
                    en: "Indonesia (South Sulawesi)",
                },
                value: {
                    id: "30:1 hingga 50:1",
                    en: "30:1 to 50:1",
                },
                context: {
                    id: "Biotipe El Tor menghasilkan kasus tanpa gejala hingga 10 kali lebih banyak dibanding galur Klasik purba.",
                    en: "El Tor biotype produces up to 10x more subclinical carriers, enabling silent global persistence.",
                },
                coordinates: { lat: -5.1477, lng: 119.4327 },
            },
            {
                id: "w7-yemen-outbreak",
                iso2: "YE",
                territoryCode: "YEM",
                metricType: "density",
                label: {
                    id: "Krisis Sanitasi Terbesar Yaman",
                    en: "Yemen Largest Modern Outbreak",
                },
                countryName: {
                    id: "Yaman (Sana'a)",
                    en: "Yemen (Sana'a)",
                },
                value: {
                    id: "2.500.000+ Kasus",
                    en: "2.5M+ Suspected Cases",
                },
                context: {
                    id: "Hancurnya stasiun pompa dan desalinasi akibat perang memicu ledakan kolera tercepat dalam sejarah abad ke-21.",
                    en: "Destruction of water pumps and electricity grids precipitated the fastest spreading 21st-century outbreak.",
                },
                coordinates: { lat: 15.3694, lng: 44.191 },
            },
            {
                id: "w7-haiti-cases",
                iso2: "HT",
                territoryCode: "HTI",
                metricType: "mortality",
                label: {
                    id: "Korban Bencana Kolera Haiti",
                    en: "Haiti Post-Disaster Casualties",
                },
                countryName: {
                    id: "Haiti (Lembah Artibonite)",
                    en: "Haiti (Artibonite Valley)",
                },
                value: {
                    id: "820.000 Kasus / 10.000 Wafat",
                    en: "820,000 Cases / 10,000 Dead",
                },
                context: {
                    id: "Infeksi sungai pasca gempa bumi 2010 menjangkiti populasi tanpa kekebalan sebelumnya selama sembilan tahun.",
                    en: "River contamination post-2010 earthquake infected an immunologically naive population for nearly a decade.",
                },
                coordinates: { lat: 18.5944, lng: -72.3074 },
            },
        ],
        historicalContext: {
            id: "Pandemi Kolera Ketujuh adalah pandemi yang masih berlangsung hingga hari ini. Bermula di Sulawesi, Indonesia pada tahun 1961, pandemi ini dipicu oleh biotipe El Tor yang lebih tangguh dan mampu bertahan hidup di perairan laut dan estuaria. Kolera modern terus mengeksploitasi runtuhnya sanitasi di daerah konflik bersenjata dan bencana alam seperti di Haiti dan Yaman.",
            en: "The Seventh Cholera Pandemic is the longest and only ongoing cholera pandemic. Beginning in Sulawesi, Indonesia in 1961, it is driven by the hardy El Tor biotype capable of prolonged aquatic survival. Today it continues to exploit sanitary collapse in humanitarian disaster and conflict zones such as Haiti and Yemen.",
        },
        territoryMap: {
            IDN: { code: "IDN", type: "epicenter" },
            MAK: { code: "IDN", type: "epicenter" },
            ID: { code: "IDN", type: "epicenter" },
            IND: { code: "IND", type: "epicenter" },
            BGD: { code: "IND", type: "epicenter" },
            DHK: { code: "IND", type: "epicenter" },
            IN: { code: "IND", type: "epicenter" },
            PER: { code: "PER", type: "epicenter" },
            LMA: { code: "PER", type: "epicenter" },
            SAM: { code: "PER", type: "epicenter" },
            PE: { code: "PER", type: "epicenter" },
            ZWE: { code: "ZWE", type: "epicenter" },
            HAR: { code: "ZWE", type: "epicenter" },
            ZW: { code: "ZWE", type: "epicenter" },
            HTI: { code: "HTI", type: "epicenter" },
            PAP: { code: "HTI", type: "epicenter" },
            HT: { code: "HTI", type: "epicenter" },
            YEM: { code: "YEM", type: "epicenter" },
            SAN: { code: "YEM", type: "epicenter" },
            YE: { code: "YEM", type: "epicenter" },
            JAK: { code: "JAK", type: "surveillance" },
        },
    },
];

export function getCholeraWave(indexOrNumber: number): CholeraWave {
    const idx =
        indexOrNumber >= 1 && indexOrNumber <= 7
            ? indexOrNumber - 1
            : Math.max(0, Math.min(indexOrNumber, CHOLERA_WAVES.length - 1));
    return CHOLERA_WAVES[idx];
}

/**
 * Safely parse a wave query/string parameter (e.g. "1".."7", "wave-2", "w3", "john-snow-1854")
 * into a 0-based waveIndex (0 to 6). Returns null if invalid or not provided.
 */
export function parseCholeraWaveParam(val: unknown): number | null {
    if (val === null || val === undefined) return null;
    const str = String(val).trim().toLowerCase();
    if (!str) return null;

    // Matches "wave-2", "wave2", "w2", "2", "3", etc.
    const numMatch = str.match(/^(?:wave-?|w)?(\d+)$/i);
    if (numMatch) {
        const num = parseInt(numMatch[1], 10);
        // If 1-indexed (1 to 7)
        if (num >= 1 && num <= CHOLERA_WAVES.length) {
            return num - 1;
        }
        // If already 0-indexed (0)
        if (num === 0) {
            return 0;
        }
    }

    // Matches by wave slug or ID
    const foundIdx = CHOLERA_WAVES.findIndex(
        (w) => w.slug.toLowerCase() === str || w.id.toLowerCase() === str,
    );
    if (foundIdx !== -1) return foundIdx;

    return null;
}

/**
 * Infer wave index from a sector code if accessible directly without query parameters.
 */
export function inferWaveIndexFromSector(sectorCode: string): number | null {
    if (!sectorCode) return null;
    const code = sectorCode.toUpperCase().trim();

    // Wave 7 specific sectors
    const wave7Codes = [
        "MAK",
        "BGD",
        "DHK",
        "PER",
        "LMA",
        "ZWE",
        "HAR",
        "HTI",
        "PAP",
        "YEM",
        "SAN",
    ];
    if (wave7Codes.includes(code)) return 6;

    // Wave 6 specific sectors
    const wave6Codes = ["PHL", "MAN"];
    if (wave6Codes.includes(code)) return 5;

    // Wave 5 specific sectors
    const wave5Codes = ["HAM", "DEU", "ALN", "JPN", "TOK", "YOK", "NGS"];
    if (wave5Codes.includes(code)) return 4;

    // Wave 4 specific sectors
    const wave4Codes = [
        "ZAN",
        "SWA",
        "SAM",
        "PRG",
        "ARG",
        "BRA",
        "EGY",
        "CAI",
        "ALX",
    ];
    if (wave4Codes.includes(code)) return 3;

    // Wave 3 specific sectors
    const wave3Codes = [
        "ITA",
        "FLO",
        "NAP",
        "IND",
        "LAT",
        "PAN",
        "CRC",
        "CUB",
        "HAV",
        "SEV",
    ];
    if (wave3Codes.includes(code)) return 2;

    // Wave 2 specific sectors
    const wave2Codes = ["FRA", "PAR", "MEK", "MEC", "SA", "SAU"];
    if (wave2Codes.includes(code)) return 1;

    // Wave 1 specific sectors
    const wave1Codes = ["JES", "BAT", "BSO", "MUS", "CAL"];
    if (wave1Codes.includes(code)) return 0;

    // For multi-wave sectors (like GBR, RUS, USA), check territory maps
    for (const wave of CHOLERA_WAVES) {
        if (wave.primaryEpicenters[code] || wave.territoryMap[code]) {
            return wave.waveIndex;
        }
    }

    return null;
}
