const Team=require('../models/Team');
const User=require('../models/User');
const createTeam=async (req,res)=>{
    const { name, description } = req.body;
    try{
        const newTeam = new Team({
            name,
            description,
            createdBy: req.user.id,
            members: [req.user.id] 
        });
        await newTeam.save();
        res.status(201).json({ message: 'Team created successfully', team: newTeam });
    }
    catch (error) {
        console.error('Error creating team:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
const addMembersToTeam=async(req,res)=>{
    const {teamID}=req.params;
    const{ members } = req.body;
    try{
        const team=await Team.findById(teamID);
        if(!team){
            return res.status(404).json({ message: 'Team not found' });
        }
        if(team.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You do not have permission to update this team' });
        }
        const users = await User.find({ _id: { $in: members } });
        if (users.length !== members.length) {
            return res.status(404).json({ message: 'Some users not found' });
        }
        team.members.push(...members);
        await team.save();
        res.status(200).json({ message: 'Members added successfully', team });




    }catch (error) {
        console.error('Error adding members to team:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports={
    createTeam,
    addMembersToTeam
}
