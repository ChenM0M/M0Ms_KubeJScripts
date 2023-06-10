//星露谷种菜系统=========================================================================
StartupEvents.registry("item", event => {
	event.create("watering_can", "basic").glow(true).unstackable().maxDamage(5).displayName("洒水壶")
})