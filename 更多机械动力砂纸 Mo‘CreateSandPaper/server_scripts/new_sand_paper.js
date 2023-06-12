
ServerEvents.tags('item', e => {
    //为物品添加砂纸的标签
    e.add('create:sandpaper', 'kubejs:obsidian_sand_paper')
})
ServerEvents.recipes(event => {
    //机械手配方（产物：涂胶纸，材料：纸与强力胶）
    event.recipes.createDeploying('kubejs:sticker', ['minecraft:paper', Item.of('create:super_glue')])
    //机械手配方（产物：未完成的黑曜石砂纸，材料：涂胶纸与黑曜石粉末）
    event.recipes.createDeploying('kubejs:obsidian_on_paper', ['create:powdered_obsidian', 'kubejs:sticker'])
    //烟熏炉配方（如想要添加鼓风机配方仅需添加原版的烟熏炉配方即可，机械动力会同步相应配方）
    event.smoking(Item.of('kubejs:obsidian_sand_paper', '{Damage:0}'),'kubejs:obsidian_on_paper')
})

