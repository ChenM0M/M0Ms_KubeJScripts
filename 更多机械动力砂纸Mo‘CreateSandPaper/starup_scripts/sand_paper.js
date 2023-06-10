const Base = Java.loadClass('com.simibubi.create.content.curiosities.tools.SandPaperItem')
const Prop = Java.loadClass('net.minecraft.world.item.Item$Properties')
const $KubeJS = Java.loadClass('dev.latvian.mods.kubejs.KubeJS')
let defProperties = new Prop().tab($KubeJS.tab)
//继承原版机械动力砂纸相关的功能（待证实）
StartupEvents.registry('item', event => {

	defProperties.defaultDurability(1024)//括号内是耐久度

	event.custom('obsidian_sand_paper',  new Base(defProperties))//' '中包含的是物品ID

})
//这样情况下貌似使用不了.displayname()了
//更多的砂纸=============================================================================
StartupEvents.registry('item', e => {
	e.create("sticker").displayName("涂胶纸").maxStackSize(1);//最大堆叠数为1
	e.create("obsidian_on_paper").displayName("未完成的黑曜石砂纸").maxStackSize(1);
})