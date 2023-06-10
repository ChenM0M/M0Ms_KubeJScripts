BlockEvents.rightClicked('minecraft:dirt', event => {
    if(event.player.mainHandItem.id == Item.of('kubejs:watering_can'))
    {
        if(event.item.nbt.Damage == 4 )//判断当水壶只剩1点耐久时禁用浇水
        {
            event.server.runCommand(`say 触发保护机制`)
            event.cancel()
        }
        else
        {
        event.server.runCommandSilent(`setblock ${event.block.x} ${event.block.y} ${event.block.z} minecraft:farmland[moisture= 7]`)//替换方块为湿润的耕地
        event.server.runCommandSilent(`particle create:fluid_drip ${event.block.x} ${event.block.y} ${event.block.z} 0.5 0.5 0.5 0.1 50`);//生成粒子（fliuid_drip可替换为其他），相关详见wiki中particle指令的内容
        event.server.runCommand(`say 浇水成功喽~`)//公屏播放
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
            e.server.runCommand(`say 灌水成功喽~`)//公屏播放
            let pos = player.block
            e.server.runCommandSilent(`particle create:fluid_drip ${pos.x} ${pos.y} ${pos.z} 0.5 0.5 0.5 0.1 50`);
            e.player.damageHeldItem('main_hand', -1)//增加一点耐久
        }
    }
})

//event.player.damageHeldItem(right, 1)
//      event.player.addItemCooldown('kubejs:watering_can', 20)

