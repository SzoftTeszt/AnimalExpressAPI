const db=require("./db")


async function getDatas(){
    // console.log("db", db)
    const rows= await db.query(
        "select * from animal"
    )
    return rows?rows:[]
}

async function create(animal){
    console.log("Animal:", animal)
    // const result = await db.query(
    // `Insert Into animal (Name, Species, Price)
    // Values ('${animal.Name}', '${animal.Species}', ${animal.Price});`
    // )

    const result = await db.query(
        `Insert Into animal (Name, Species, Price) values (?,?,?)`,
        [animal.Name, animal.Species, animal.Price ])

    let message ="Error in creating animal"

    if (result.affectedRows)
        message="Animal created successfully"

    return {message}

} 

async function update(id,animal){
    const result= await db.query(`
    update animal set Name=?, Species=?, Price=? where Id=?`,
    [animal.Name, animal.Species, animal.Price, id])

    let message ="Error in updating animal"
    if (result.affectedRows)
        message="Animal updated successfully"
    return {message}
}
async function patch(id,animal){
    let fields= Object.keys(animal).map(
        (field)=> field+"=?"
    ).join(", ")

    let updateValues=Object.values(animal)
    updateValues.push(id)
    console.log("Fields:", fields)
    console.log("updateValues:", updateValues)

    const result= await db.query(`
    update animal set ${fields} where Id=?`,
    updateValues)   

    let message ="Error in updating animal"
    if (result.affectedRows)
        message="Animal updated successfully"
    return {message}
}

async function remove(id){
    const result= await db.query(`
    delete from animal where Id=?`,
    [id])

    let message ="Error in deleting animal"
    if (result.affectedRows)
        message="Animal deleted successfully"
    return {message}
}

module.exports={
    getDatas,
    create,
    update,
    remove,
    patch
}