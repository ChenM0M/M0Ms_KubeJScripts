//橙色混凝土加速、蓝色跳跃
PlayerEvents.tick(event => {
	//淡蓝色跳跃提升
	const { player, sever } = event
	let pos = player.block.offset(0, -1, 0)//将pos值设为玩家脚底下坐标
	if (pos.id == 'minecraft:light_blue_concrete')//判定pos值（即坐标处）是否为淡蓝色混凝土
	{
		event.player.potionEffects.add("minecraft:jump_boost", 10, 5, false, false)
	}
})
//橙色加速
PlayerEvents.tick(event => {
	const { player, sever } = event
	let pos = player.block.offset(0, -1, 0)
	if (pos.id == 'minecraft:orange_concrete') {
		event.player.potionEffects.add("minecraft:speed", 5, 10, false, false)
	}
})
//黑色黑暗(检测头顶与脚)
PlayerEvents.tick(event => {
	const { player, sever } = event
	let posdown = player.block.offset(0, -1, 0)
	let posup = player.block.offset(0, 2, 0)//判断头顶方块（玩家趴下时仍计算站立时头顶的方块）
	if (posdown.id == 'minecraft:black_concrete' || posup.id == 'minecraft:black_concrete') {
		event.player.potionEffects.add("minecraft:darkness", 5, 1, false, false)
	}
})
//蜂蜜块漂浮
PlayerEvents.tick(event => {
	const { player, sever } = event
	//判断所有旁边的方块
	let posx = player.block.offset(1, 0, 0)
	let posz = player.block.offset(0, 0, 1)
	let posxx = player.block.offset(0, 0, -1)
	let poszz = player.block.offset(-1, 0, 0)
	if (posx.id == 'minecraft:honey_block' || posz.id == 'minecraft:honey_block' || posxx.id == 'minecraft:honey_block' || poszz.id == 'minecraft:honey_block') {
		if (player.isCrouching()) {
			event.player.potionEffects.add("minecraft:levitation", 1, 2, false, false)
		}
	}
})
//绿宝石存档点
var playerlist = {}
PlayerEvents.tick(event => {
	const { player, sever } = event
	let pos = player.block.offset(0, -1, 0)
	if (pos.id == 'minecraft:emerald_block') {
		playerlist[player.name] = [Math.floor(Number(player.x)), Math.floor(Number(player.y)), Math.floor(Number(player.z))];//获取玩家坐标使用Math.floor（）舍去小数部分
        player.runCommandSilent(`title @a actionbar "\u00A74记录点已设定至${playerlist[player.name][0]},${playerlist[player.name][1]},${playerlist[player.name][2]}"`);
	}
})
ItemEvents.rightClicked(event => {
	let player = event.player
	//判断是否手持金锄右键（右键耕地不触发）
	if (player.getHeldItem(event.hand) == Item.of('minecraft:golden_hoe')) {
		if (player.name in playerlist) {
			player.setPosition(playerlist[player.name][0] + 0.5, playerlist[player.name][1], playerlist[player.name][2] + 0.5)//传送时将玩家传送至方块中心，所以x、z值+0.5
		}

	}

})
