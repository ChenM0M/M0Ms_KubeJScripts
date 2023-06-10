//橙色混凝土加速、蓝色跳跃=============================================================
PlayerEvents.tick(event=>{
    //淡蓝色跳跃提升
    const{player,sever}=event
	let pos = player.block.offset(0, -1, 0)//将pos值设为玩家脚底下坐标
	if(pos.id == 'minecraft:light_blue_concrete')//判定pos值（即坐标处）是否为淡蓝色混凝土
    {
	event.player.potionEffects.add("minecraft:jump_boost",10,5,false,false)
	}
})
PlayerEvents.tick(event=>{
    //橙色加速
    const{player,sever}=event
	let pos = player.block.offset(0, -1, 0)
	if(pos.id == 'minecraft:orange_concrete')
    {
	event.player.potionEffects.add("minecraft:speed",5,10,false,false)
	}
})

//player.isCrouching() && 