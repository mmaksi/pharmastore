const ROLE = {
    ADMIN: "admin",
    BASIC: "basic"
}

module.exports = {
    ROLE,
    users: [
        { id: 1, name: "mark", role: ROLE.ADMIN },
        { id: 2, name: "hovsep", role: ROLE.BASIC },
        { id: 3, name: "dianne", role: ROLE.BASIC }
    ],
    projects: [
        { id: 1, name: "mark's project", userId: 1 },
        { id: 2, name: "hovsep's project", userId: 2 },
        { id: 3, name: "dianne's project", userId: 3 }
    ]
}