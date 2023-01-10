import React from 'react'
import { Link } from'react-router-dom'

const HomeScreen = () => {

    return (
        <>
            <div>
                next steps: filters - user can update profile photo/super admin can approve or disapprove profile photo, able to do multiple filters at once, users can upload photo that needs admin approval, create super admin role who can approve new admins, pagination for posts/view profiles, waiver/code of conduct, sendgrid for email notifications, fix update profile to not add returned user to users reducer, how will upload folder get added when deploying?
            </div>
            <h2>Welcome to Sandsharks</h2>
            <p>Toronto SandSharks is a beach volleyball league for LGBTQ+ folks and allies.</p>
            <div>
                <h3>Who is welcome to join?</h3>
                <p>
                    Anyone and everyone! The group is geared towards providing a safe and fun atmosphere for LGBTQ+ adults and allies. All ages (typically 18+ is encouraged), backgrounds, genders, and athletic abilities are welcome to come give it a try. 
                </p>
                <p>
                    We’ll do our best to pair you up with others around your skill level; we have members who have played university, college, and national level volleyball, and people who have never touched a volleyball before. Most people are somewhere in between.
                </p>
            </div>
            <div>
                <h3>Where do we play?</h3>
                <p>
                    <a href="https://www.toronto.ca/data/parks/prd/facilities/complex/1/index.html" target="_blank" rel="noopener noreferrer">Ashbridges Bay</a> in the Toronto Beaches. This is a public beach, so please do your best to familiarize yourself with and follow the rules of the beach so that we keep our good reputation with all beach goers. 
                </p>
                <p>
                    There is paid parking available at the park, and lots of places to lock up your bike. The Lakeshore bike path will take you right there!
                </p>
            </div>
            <div>
                <h3>When do we play?</h3>
                <p>
                    We try to play whenever the sun is shining throughout the summer. We often start in April and finish the season in October. There is no set schedule, but we try to play most weekends between 8am-5pm, depending on the weather and court availability. You can stay for the whole day or just come play a couple games, most folks play for a few hours at a time. <Link to='/register' className='link'>Become a member</Link> to get the weekly updates.
                </p>
            </div>
            <div>
                <h3>How do I become a member?</h3>
                It’s free to join and play, and you can play as many games as you’d like throughout the season. You’ll be asked to agree to a code of conduct and to sign a waiver to indemnify the league of any responsibility of injuries and lost possessions.
                <Link to='/register' className='link'><h4>Click here to become a member</h4></Link>
            </div>
            
            <Link to='/login' className='link'><h4>Member Login</h4></Link>
  
        </>
    )
}

export default HomeScreen