module.exports = {
    addRoles: (member) => {
        member.roles.add(process.env.PINGNEWSROLE);
        member.roles.add(process.env.PINGSTREAMSROLE);
        member.roles.add(process.env.PINGUPDATESROLE);
        member.roles.add(process.env.PINGPOLLSROLE);
    }
}