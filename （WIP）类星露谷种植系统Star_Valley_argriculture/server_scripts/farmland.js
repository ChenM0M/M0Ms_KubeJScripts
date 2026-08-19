BlockEvents.rightClicked('minecraft:dirt', event => {
    if(event.player.mainHandItem.id == Item.of('kubejs:watering_can'))
    {
        const dim = event.player.dimension.id
        if(event.item.nbt.Damage == 4 )//判断当水壶只剩1点耐久时禁用浇水
        {
            event.player.runCommandSilent(`title @s actionbar 触发保护机制`)
            event.cancel()
        }
        else
        {
        event.server.runCommandSilent(`execute in ${dim} run setblock ${event.block.x} ${event.block.y} ${event.block.z} minecraft:farmland[moisture=7]`)//替换方块为湿润的耕地
        event.server.runCommandSilent(`execute in ${dim} run particle create:fluid_drip ${event.block.x} ${event.block.y} ${event.block.z} 0.5 0.5 0.5 0.1 50`);//生成粒子（fliuid_drip可替换为其他），相关详见wiki中particle指令的内容
        event.player.runCommandSilent(`title @s actionbar 浇水成功喽~`)//本地提示
        event.player.damageHeldItem('main_hand', 1)//消耗一点耐久
        event.player.addItemCooldown('kubejs:watering_can', 20)//废物代码）不影响浇水频率）
        }
    }
})

ItemEvents.rightClicked(e=>{
    let player = e.player
    if (player.getHeldItem(e.hand) == 'kubejs:watering_can') {
        let target = player.rayTrace(5)
        if (target.block.id == 'minecraft:water') //通过玩家实现追踪实现辨认玩家对着水右键
        {
            const dim = player.dimension.id
            player.runCommandSilent(`title @s actionbar 灌水成功喽~`)//本地提示
            let pos = player.block
            e.server.runCommandSilent(`execute in ${dim} run particle create:fluid_drip ${pos.x} ${pos.y} ${pos.z} 0.5 0.5 0.5 0.1 50`);
            e.player.damageHeldItem('main_hand', -1)//增加一点耐久
        }
    }
})

//event.player.damageHeldItem(right, 1)
//      event.player.addItemCooldown('kubejs:watering_can', 20)

