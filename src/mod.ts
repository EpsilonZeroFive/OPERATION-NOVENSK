import { DependencyContainer } from "tsyringe";

// SPT types
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { PreAkiModLoader } from "@spt-aki/loaders/PreAkiModLoader";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { ImporterUtil } from "@spt-aki/utils/ImporterUtil";
import { ImageRouter } from "@spt-aki/routers/ImageRouter";
import { CustomTraderAssortData } from "../models/spt/services/CustomTraderAssortData";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { ITraderAssort, ITraderBase } from "@spt-aki/models/eft/common/tables/ITrader";
import { ITraderConfig, UpdateTime } from "@spt-aki/models/spt/config/ITraderConfig";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { Traders } from "@spt-aki/models/enums/Traders";
import { Item } from "@spt-aki/models/eft/common/tables/IItem";
import { IPreAkiLoadMod } from "@spt-aki/models/external/IPreAkiLoadMod";
import { IPostAkiLoadMod } from "@spt-aki/models/external/IPostAkiLoadMod";
import { ILocaleGlobalBase } from "@spt-aki/models/spt/server/ILocaleBase";
import { IInvConfigConfig } from "@spt-aki/models/spt/config/IInvConfigConfig";

// 新商人基本文件
import * as baseJson from "../db/base.json";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseJson = __importStar(require("../db/assort/GriffinSupplier/base.json"));

class SampleTrader {
    public mod: any;
	public logger: any;

    constructor() {
        this.mod = "Girls Frontline - Operation Novensk V4.2";
    }

    // Perform these actions before server fully loads
    public preAkiLoad(container: DependencyContainer): void {
        this.logger = container.resolve<ILogger>("WinstonLogger");
		const configServer = container.resolve<ConfigServer>("ConfigServer");
		const traderConfig = configServer.getConfig<ITraderConfig>(ConfigTypes.TRADER);	
		const invConfig = configServer.getConfig<IInvConfigConfig>(ConfigTypes.INVENTORY);
		Traders["GriffinSupplier"] = "GriffinSupplier";
		
        this.registerProfileImage(container);
        this.setupTraderUpdateTime(container);
    }

    public postDBLoad(container: DependencyContainer): void {
        //信息
        const logger = container.resolve<ILogger>("WinstonLogger");		
        logger.logWithColor("欢迎来到格里芬，指挥官！人形们已经在等着了", "green");
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
		const configServer = container.resolve<ConfigServer>("ConfigServer");
        const jsonUtil = container.resolve<JsonUtil>("JsonUtil");
		const VFS = container.resolve<VFS>("VFS");
        const tables = databaseServer.getTables();
        const ImporterUtil = container.resolve<ImporterUtil>("ImporterUtil");
		const locales = Object.values(tables.locales.global) as ILocaleGlobalBase[];
        const preAkiModLoader = container.resolve<PreAkiModLoader>("PreAkiModLoader");
        const db = ImporterUtil.loadRecursive(`${preAkiModLoader.getModPath("Girls Frontline - Operation Novensk V4.2")}db/`);
		const allitems = tables.templates.items;
		//添加图片资源
		const iconPath = `${preAkiModLoader.getModPath("Girls Frontline - Operation Novensk V4.2")}images/quests/`
		const iconList = VFS.getFiles(iconPath);
		const imageRouter = container.resolve<ImageRouter>("ImageRouter");
		for (const icon of iconList){
			const filename = VFS.stripExtension(icon);
			imageRouter.addRoute(`/files/quest/icon/${filename}`, `${iconPath}${icon}`);
		}		
		
		//添加mod物品的items
		for (const item in db.items) {
			tables.templates.items[item] = db.items[item];
		}
		
		
        //添加mod武器熟练度系统
		tables.globals.config.Mastering[0].Templates.push("Beowulf","HK416","HK416 MOD1","HK416 MOD2","HK416 MOD3","M4A1 FDE","M16A1","ST AR15 MOD1","ST AR15 MOD2","ST AR15 MOD3 SBR","ST AR15 MOD3 SPR","ST AR15","ST AR15","RO635","RO635 MOD1","RO635 MOD2","RO635 MOD3","M4A1 MOD1","M4A1 MOD2","M4A1 MOD3","MK12 DIY");  
		tables.globals.config.Mastering[1].Templates.push("Zas M76","Saiga 308","QBZ-03","QBZ-191"); 
		tables.globals.config.Mastering[2].Templates.push("56ban","63shi","Type-56 MOD1","Type-56 MOD2","Type-56 MOD3"); 
		tables.globals.config.Mastering[3].Templates.push("OTs12"); 
		tables.globals.config.Mastering[4].Templates.push("AK-12","AK-15","AK-15 MOD1","AK-15 MOD2","AK-15 MOD3"); 
		tables.globals.config.Mastering[5].Templates.push("AS VAL MOD1","AS VAL MOD2","AS VAL MOD3"); 
		tables.globals.config.Mastering[6].Templates.push("MP-443 MOD1","MP-443 MOD2","MP-443 MOD3"); 
		tables.globals.config.Mastering[10].Templates.push("PM MOD1","PM MOD2","PM MOD3"); 
		tables.globals.config.Mastering[13].Templates.push("MP5 MOD1","MP5 MOD2","MP5 MOD3"); 
		tables.globals.config.Mastering[18].Templates.push("M61"); 
		tables.globals.config.Mastering[19].Templates.push("SV98 MOD1","SV98 MOD2","SV98 MOD3",); 
		tables.globals.config.Mastering[24].Templates.push("Stechkin MOD1","Stechkin MOD2","Stechkin MOD3",); 
		tables.globals.config.Mastering[25].Templates.push("M14 MOD1","M14 MOD2","M14 MOD3","M14","M21",); 
		tables.globals.config.Mastering[26].Templates.push("super shorty",); 
		tables.globals.config.Mastering[27].Templates.push("Mosin MOD1","Mosin MOD2","Mosin MOD3"); 
		tables.globals.config.Mastering[34].Templates.push("QBZ-97","QBZ-95","QBU-88"); 
		tables.globals.config.Mastering[37].Templates.push("M9"); 
		tables.globals.config.Mastering[42].Templates.push("C14GN","C14YE");
		tables.globals.config.Mastering[43].Templates.push("M110","Super SASS MOD1","Super SASS MOD2","Super SASS MOD3","Super SASS"); 
		tables.globals.config.Mastering[44].Templates.push("M1911 MOD1","M1911 MOD2","M1911 MOD3"); 
		tables.globals.config.Mastering[45].Templates.push("PPSH41 MOD1","PPSH41 MOD2","PPSH41 MOD3"); 
		tables.globals.config.Mastering[47].Templates.push("UMP45 MOD1","UMP45 MOD2","UMP45 MOD3","UMP40","UMP9 MOD1","UMP9 MOD2","UMP9 MOD3","UMP9"); 
		tables.globals.config.Mastering[57].Templates.push("USP-C","Desert Eagle"); 
		tables.globals.config.Mastering[60].Templates.push("G36 MOD1","G36 MOD2","G36 MOD3"
		); 
		
		//
		for (const item in tables.templates.items) {
			if (tables.templates.items[item]._props.Slots) {
				for (const slot in tables.templates.items[item]._props.Slots) {
					for (const filter in tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter) {					
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "55d355e64bdc2d962f8b4569") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("ST AR15 receiver")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "55d355e64bdc2d962f8b4569") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("MK12 SPR receiver")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "55d355e64bdc2d962f8b4569") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("MK12 SPR receiver DIY")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5bb20d53d4351e4502010a69") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("HK416 receiver")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "57dc32dc245977596d4ef3d3") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("OTs-12 handguard")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "57838f9f2459774a150289a0") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("OTs-12 magazine")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "6193d3cded0429009f543e6a") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("USP trigger")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5c6d10fa2e221600106f3f23") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("SMR")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "6193d5d4f8ee7e52e4210a1b") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("USP catch")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5ea03e5009aa976f2e7a514b") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("ppsh receiver")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5ea03e5009aa976f2e7a514b") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("ppsh receiver old")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5c07dd120db834001c39092d") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("QBZ-191 scope")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "584984812459776a704a82a6") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("Holosun510c")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "584984812459776a704a82a6") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("Aimpoint 1000")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "584984812459776a704a82a6") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("Holosun510c FDE")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "584984812459776a704a82a6") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("EXPS3 blk")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "626becf9582c3e319310b837") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("ARMS 32")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "609bab8b455afd752b2e6138") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("omm")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "609bab8b455afd752b2e6138") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("omm fde")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "62811f461d5df4475f46a332") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("G33 fix")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "544909bb4bdc2d6f028b4577") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("Offset Scout Mount")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "544909bb4bdc2d6f028b4577") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("Offset Scout Mount FDE")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5a34fe59c4a282000b1521a2") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("AAC M4-2000")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5ea034eb5aad6446a939737b") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("ppsh mag 35")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5ea034eb5aad6446a939737b") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("ppsh mag 71")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "626becf9582c3e319310b837") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("handguard strip")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5c05413a0db834001c390617") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("HK416 mag fast")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5c05413a0db834001c390617") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("HK416 mag")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5c05413a0db834001c390617") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("HK416 mag fast Magpul")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5c05413a0db834001c390617") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("HK416 mag fast Magpul BLK")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5c05413a0db834001c390617") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("HK416 mag fast blk")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "626becf9582c3e319310b837") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("handguard strip blk")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "626becf9582c3e319310b837") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("handguard chip")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "626becf9582c3e319310b837") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("handguard chip fde")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "626becf9582c3e319310b837") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("handguard chip s")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5ea02bb600685063ec28bfa1") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("ppsh barrel")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "560d5e524bdc2d25448b4571") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("050920060000000000000029frag12")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "55d355e64bdc2d962f8b4569") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("M4A1 receiver FDE")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "55d355e64bdc2d962f8b4569") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("M16 receiver")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "55d355e64bdc2d962f8b4569") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("Beowulf receiver")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "55d355e64bdc2d962f8b4569") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("ST AR15 receiver SBR")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "62669bccdb9ebb4daa44cd14") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("M4A1 DIY adapter")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5d1f819086f7744b355c219b") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("Super SASS DIY adapter")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5a33cae9c4a28232980eb086") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("GEN2 FDE DIY")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5d025cc1d7ad1a53845279ef") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("Erge PSG-1 FDE")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "55d459824bdc2d892f8b4573") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("M4A1 KAC RIS FDE")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "55d459824bdc2d892f8b4573") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("RO635 handguard")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "55d459824bdc2d892f8b4573") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("BAR2")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "55d459824bdc2d892f8b4573") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("BAR3")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "55d459824bdc2d892f8b4573") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("BAR3 s")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "544a38634bdc2d58388b4568") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("ST AR-15 muzzle")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "55d355e64bdc2d962f8b4569") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("mega")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "55d459824bdc2d892f8b4573") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("Black 17")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5b7be47f5acfc400170e2dd2") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("M-lok 4.1 side")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "637f57b78d137b27f70c496a") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("M4A1 KAC RIS Lower FDE")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "55d459824bdc2d892f8b4573") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("M16A1 handguard")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5c9a25172e2216000f20314e") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("RIS II BLK")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5df8e4080b92095fd441e594") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("M110 receiver")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5dfa3d45dfc58d14537c20b0") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("M110 gas block")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5df8e053bb49d91fb446d6a6") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("M110 charge")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "62811f461d5df4475f46a332") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("AR-15 handle")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5dfa3d45dfc58d14537c20b0") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("M110 gas block FDE")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5df917564a9f347bc92edca3") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("M110 barrel 16in")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5df917564a9f347bc92edca3") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("M110 barrel 20in")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5df916dfbb49d91fb446d6b9") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("M110 handguard")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5df916dfbb49d91fb446d6b9") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("M110 handguard BLK")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "638f2003bbd47aeb9e0ff637") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("RIS II BLK Lower")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5c9a25172e2216000f20314e") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("AR15 short handguard")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5c9a25172e2216000f20314e") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("MK10")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5addbac75acfc400194dbc56") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("M21 qiangguan")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5beec2820db834001b095426") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("AK-12 barrel 550")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "544909bb4bdc2d6f028b4577") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("AN PEQ-15 BLK")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5efb0fc6aeb21837e749c801") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("050920060000000000000003xm261")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "54527a984bdc2d4e668b4567") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("050920060000000000000004beofmj")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "54527a984bdc2d4e668b4567") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("050920060000000000000005beofmj2")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "54527a984bdc2d4e668b4567") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("050920060000000000000006beohp")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "54527a984bdc2d4e668b4567") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("050920060000000000000007beosp")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5fd20ff893a8961fc660a954") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("050920060000000000000011300highspeed")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "54527a984bdc2d4e668b4567") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("050920060000000000000022556highspeed")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "55d4ae6c4bdc2d8b2f8b456e") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("M4A1 stock M4SS FDE")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "55d459824bdc2d892f8b4573") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("PRI Gen.3")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5649be884bdc2d79388b4577") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("M16 stock")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5649be884bdc2d79388b4577") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("M16 stock DIY")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5649be884bdc2d79388b4577") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("Beowulf stock")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5c0faeddd174af02a962601f") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("M110 fix")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5649be884bdc2d79388b4577") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("M110 stock")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "55d4af3a4bdc2d972f8b456f") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("HK416 sight front")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5bc09a18d4351e003562b68e") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("HK416 sight rear")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "612e0e55a112697a4b3a66e7") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("Halo fixing ring")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "612e0e55a112697a4b3a66e7") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("Halo fixing ring FDE")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5aaa5e60e5b5b000140293d6") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("M16 mag 20")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5aaa5e60e5b5b000140293d6") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("M4A1 mag 20 fast")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5aaa5e60e5b5b000140293d6") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("M4A1 mag 20 fast fde")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5aaa5e60e5b5b000140293d6") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("M4A1 mag 20 fast DIY")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5aaa5e60e5b5b000140293d6") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("Beowulf mag 20")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5aaa5e60e5b5b000140293d6") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("Beowulf mag gen 20")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5aaa5e60e5b5b000140293d6") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("Beowulf mag gen 30")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5aaa5e60e5b5b000140293d6") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("Beowulf mag gen 30 fde")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5aaa5e60e5b5b000140293d6") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("Beowulf mag gen 40")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5aaa5e60e5b5b000140293d6") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("Beowulf mag gen 40 fde")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5cda9bcfd7f00c0c0b53e900") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("M900V")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5aaa5e60e5b5b000140293d6") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("Beowulf mag sta")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "570fd6c2d2720bc6458b457f") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("Eotech 553 FDE")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5b30b0dc5acfc400153b7124") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("Comp M2")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "570fd6c2d2720bc6458b457f") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("Eotech 553 DIY")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5b30bc285acfc47a8608615d") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("MK10 Dow mount")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "55d3632e4bdc2d972f8b4569") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("AR15 barrel 127")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5649be884bdc2d79388b4577") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("RO635 stock tube DIY")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5649be884bdc2d79388b4577") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("M4A1 stock tube DIY")
						}
						if (tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] === "5beec2820db834001b095426") {
							tables.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("AK-12 barrel 370")
						}
					}
				}
			}
			if (tables.templates.items[item]._props.Chambers) {
				for (const slot in tables.templates.items[item]._props.Chambers) {
					for (const filter in tables.templates.items[item]._props.Chambers[slot]._props.filters[0].Filter) {					
						if (tables.templates.items[item]._props.Chambers[slot]._props.filters[0].Filter[filter] === "5efb0fc6aeb21837e749c801") {
							tables.templates.items[item]._props.Chambers[slot]._props.filters[0].Filter.push("050920060000000000000003xm261")
						}
						if (tables.templates.items[item]._props.Chambers[slot]._props.filters[0].Filter[filter] === "560d5e524bdc2d25448b4571") {
							tables.templates.items[item]._props.Chambers[slot]._props.filters[0].Filter.push("050920060000000000000029frag12")
						}
						if (tables.templates.items[item]._props.Chambers[slot]._props.filters[0].Filter[filter] === "54527a984bdc2d4e668b4567") {
							tables.templates.items[item]._props.Chambers[slot]._props.filters[0].Filter.push("050920060000000000000004beofmj")
						}
						if (tables.templates.items[item]._props.Chambers[slot]._props.filters[0].Filter[filter] === "54527a984bdc2d4e668b4567") {
							tables.templates.items[item]._props.Chambers[slot]._props.filters[0].Filter.push("050920060000000000000005beofmj2")
						}
						if (tables.templates.items[item]._props.Chambers[slot]._props.filters[0].Filter[filter] === "54527a984bdc2d4e668b4567") {
							tables.templates.items[item]._props.Chambers[slot]._props.filters[0].Filter.push("050920060000000000000006beohp")
						}
						if (tables.templates.items[item]._props.Chambers[slot]._props.filters[0].Filter[filter] === "5fd20ff893a8961fc660a954") {
							tables.templates.items[item]._props.Chambers[slot]._props.filters[0].Filter.push("050920060000000000000011300highspeed")
						}
						if (tables.templates.items[item]._props.Chambers[slot]._props.filters[0].Filter[filter] === "54527a984bdc2d4e668b4567") {
							tables.templates.items[item]._props.Chambers[slot]._props.filters[0].Filter.push("050920060000000000000007beosp")
						}
						if (tables.templates.items[item]._props.Chambers[slot]._props.filters[0].Filter[filter] === "54527a984bdc2d4e668b4567") {
							tables.templates.items[item]._props.Chambers[slot]._props.filters[0].Filter.push("050920060000000000000022556highspeed")
						}
						if (tables.templates.items[item]._props.Chambers[slot]._props.filters[0].Filter[filter] === "54527a984bdc2d4e668b4567") {
							tables.templates.items[item]._props.Chambers[slot]._props.filters[0].Filter.push("050920060000000000000017mk318modx")
						}
						if (tables.templates.items[item]._props.Chambers[slot]._props.filters[0].Filter[filter] === "58dd3ad986f77403051cba8f") {
							tables.templates.items[item]._props.Chambers[slot]._props.filters[0].Filter.push("050920060000000000000019m948")
						}
						if (tables.templates.items[item]._props.Chambers[slot]._props.filters[0].Filter[filter] === "58dd3ad986f77403051cba8f") {
							tables.templates.items[item]._props.Chambers[slot]._props.filters[0].Filter.push("050920060000000000000018m948modx")
						}
					}
				}
			}
			if (tables.templates.items[item]._props.Cartridges) {
				for (const slot in tables.templates.items[item]._props.Cartridges) {
					for (const filter in tables.templates.items[item]._props.Cartridges[slot]._props.filters[0].Filter) {					
						if (tables.templates.items[item]._props.Cartridges[slot]._props.filters[0].Filter[filter] === "5efb0fc6aeb21837e749c801") {
							tables.templates.items[item]._props.Cartridges[slot]._props.filters[0].Filter.push("050920060000000000000003xm261")
						}
					}
					for (const filter in tables.templates.items[item]._props.Cartridges[slot]._props.filters[0].Filter) {
						if (tables.templates.items[item]._props.Cartridges[slot]._props.filters[0].Filter[filter] === "560d5e524bdc2d25448b4571") {
							tables.templates.items[item]._props.Cartridges[slot]._props.filters[0].Filter.push("050920060000000000000029frag12")
						}
					}
					for (const filter in tables.templates.items[item]._props.Cartridges[slot]._props.filters[0].Filter) {
						if (tables.templates.items[item]._props.Cartridges[slot]._props.filters[0].Filter[filter] === "54527a984bdc2d4e668b4567") {
							tables.templates.items[item]._props.Cartridges[slot]._props.filters[0].Filter.push("050920060000000000000017mk318modx")
						}
					}
					for (const filter in tables.templates.items[item]._props.Cartridges[slot]._props.filters[0].Filter) {
						if (tables.templates.items[item]._props.Cartridges[slot]._props.filters[0].Filter[filter] === "58dd3ad986f77403051cba8f") {
							tables.templates.items[item]._props.Cartridges[slot]._props.filters[0].Filter.push("050920060000000000000019m948")
						}
					}
					for (const filter in tables.templates.items[item]._props.Cartridges[slot]._props.filters[0].Filter) {
						if (tables.templates.items[item]._props.Cartridges[slot]._props.filters[0].Filter[filter] === "54527a984bdc2d4e668b4567") {
							tables.templates.items[item]._props.Cartridges[slot]._props.filters[0].Filter.push("050920060000000000000022556highspeed")
						}
					}
					for (const filter in tables.templates.items[item]._props.Cartridges[slot]._props.filters[0].Filter) {
						if (tables.templates.items[item]._props.Cartridges[slot]._props.filters[0].Filter[filter] === "5fd20ff893a8961fc660a954") {
							tables.templates.items[item]._props.Cartridges[slot]._props.filters[0].Filter.push("050920060000000000000011300highspeed")
						}
					}
					for (const filter in tables.templates.items[item]._props.Cartridges[slot]._props.filters[0].Filter) {
						if (tables.templates.items[item]._props.Cartridges[slot]._props.filters[0].Filter[filter] === "58dd3ad986f77403051cba8f") {
							tables.templates.items[item]._props.Cartridges[slot]._props.filters[0].Filter.push("050920060000000000000018m948modx")
						}
					}
				}
			}
		}	
		//添加文字说明
		for (const locale of locales) {
			//添加物品文字说明（方便340以下移植）
            for(const item in db.locales["itemsdescription"]){
                locale[(item + " Name")] = db.locales["itemsdescription"][item].Name
				locale[(item + " ShortName")] = db.locales["itemsdescription"][item].ShortName
				locale[(item + " Description")] = db.locales["itemsdescription"][item].Description
            }
			//添加任务说明（方便340以下移植）
		    for(const description in db.locales.quest){
				locale[(description + " name")] = db.locales.quest[description].name//任务名称
				locale[(description + " description")] = db.locales.mail[db.locales.quest[description].description]//任务描述
				locale[(description + " startedMessageText")] = db.locales.mail[db.locales.quest[description].startedMessageText]//任务接取
				locale[(description + " successMessageText")] = db.locales.mail[db.locales.quest[description].successMessageText]//任务成功
				locale[(description + " failMessageText")] = db.locales.mail[db.locales.quest[description].failMessageText]//任务失败
			    for(const conditions in db.locales.quest[description].conditions){	
                    locale[(conditions)] = db.locales.quest[description].conditions[conditions]//任务要求说明
		    }}

			//添加文字说明（340以上适配）
			for(const description in db.locales["GriffinSupplier"]){
                locale[description] = db.locales["GriffinSupplier"][description]
            }
		}	
		//添加任务
		for (let qt in db.templates.quests) {
			tables.templates.quests[qt] = db.templates.quests[qt];
		}
		//添加跳蚤分类
		for (const hb in db.templates.newhandbook) {
			tables.templates.handbook.Categories.push(db.templates.newhandbook[hb]);
		}				
		
		//添加物品的跳蚤分类
		for (const ha in db.templates.handbook) {
			tables.templates.handbook.Items.push(db.templates.handbook[ha]);
		}
		// 将新商人信息添加到服务器中
		for (const newtrader in db.assort) {
			tables.traders[newtrader] = db.assort[newtrader];
		}
		//新商人投保黄字警告修复	
		const InsuranceConfig = configServer.getConfig<IInsuranceConfig>(ConfigTypes.INSURANCE);
		for (const ATMultiplier in db.templates.Insurance["insuranceMultiplier"]) {
			InsuranceConfig["insuranceMultiplier"][ATMultiplier] = db.templates.Insurance["insuranceMultiplier"][ATMultiplier];
		}
		for (const ATChancePercent in db.templates.Insurance["returnChancePercent"]) {
			InsuranceConfig["returnChancePercent"][ATChancePercent] = db.templates.Insurance["returnChancePercent"][ATChancePercent];
		}
		
		//新商人修理黄字警告修复
		const traderConfig = configServer.getConfig<ITraderConfig>(ConfigTypes.TRADER);
		for (const GriffinSupplierdurability in db.templates.durabilityPurchaseThreshhold) {
			traderConfig.durabilityPurchaseThreshhold[GriffinSupplierdurability] = db.templates.durabilityPurchaseThreshhold[GriffinSupplierdurability];
		}			
	}
    private registerProfileImage(container: DependencyContainer): void {
        // 添加新商人头像图片资源
        const preAkiModLoader = container.resolve<PreAkiModLoader>("PreAkiModLoader");
        const imageFilepath = `./${preAkiModLoader.getModPath(this.mod)}res`;
        const imageRouter = container.resolve<ImageRouter>("ImageRouter");
        imageRouter.addRoute(baseJson.avatar.replace(".jpg", ""), `${imageFilepath}/G&K.jpg`);		
    }

    private setupTraderUpdateTime(container: DependencyContainer): void {
        // 添加新商人刷新参数
        const configServer = container.resolve<ConfigServer>("ConfigServer");
        const traderConfig = configServer.getConfig<ITraderConfig>(ConfigTypes.TRADER);		
        const traderRefreshConfig: UpdateTime = { traderId: baseJson._id, _name: baseJson.name,seconds: {"min": 600,"max": 700} }		
        traderConfig.updateTime.push(traderRefreshConfig);
    }
}

module.exports = { mod: new SampleTrader() }