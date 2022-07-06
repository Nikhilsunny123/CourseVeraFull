module.exports=(sequelize,DataTypes)=>{
   
    const Course=sequelize.define("Course",{

        title:{
            type: DataTypes.STRING,
            allowNull:true,
        },
        content:{
            type: DataTypes.STRING,
            allowNull:true,
        },
        duration:{
            type: DataTypes.STRING,
            allowNull:true,
        },
        price:{
            type: DataTypes.STRING,
            allowNull:true,
        },
    });

    

    return Course;
}