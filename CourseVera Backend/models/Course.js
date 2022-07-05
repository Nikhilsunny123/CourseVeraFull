module.exports=(sequelize,DataTypes)=>{
   
    const Course=sequelize.define("Course",{

        title:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        content:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        duration:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        price:{
            type: DataTypes.STRING,
            allowNull:false,
        },
    });
    return Course;
}