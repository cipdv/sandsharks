import React from 'react'
import BeginnerClinicPost from './BeginnerClinicPost'
import Posts from './Posts'
import VballExperience from './VballExperience'

const UserDashboard = ({user}) => {

    return (
        <div>
            <h3>Hi {user.preferredName}!</h3>
            
               
            <VballExperience user={user} />
            {user.vballExperience !== 'novballexperience' ? (
                <>
                    <Posts user={user}/>
                    <BeginnerClinicPost user={user} />
                </>
            ) : (
                <BeginnerClinicPost user={user}/>           
            )}
            <div>
                -contact Sandsharks organization
            </div>
            <div>
                -lost and found, make a claim
            </div>
            <div>
                -community section, message board?, post your business profile
            </div>          
        </div>
    )
}

export default UserDashboard