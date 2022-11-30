import React from 'react'

const AdminDashboard = ({user}) => {

    return (
        <>
            <div>
                Welcome{user.firstName}
            </div>
            <div>
                *Admin
            </div>
        </>
    )
}

export default AdminDashboard