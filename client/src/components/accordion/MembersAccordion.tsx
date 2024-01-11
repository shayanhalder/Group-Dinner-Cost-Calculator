import MemberStyles from './MembersAccordion.module.css'

export default function MembersAccordion() {


    return (
        <div className={MemberStyles.parent}>
            <button className={MemberStyles.toggle}> Group Members </button>
            <div className={MemberStyles.container}>
                <p> Group members are: </p>
            </div>
        
        </div>
    )

}