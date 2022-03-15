import React from 'react';
import {useRecoilValue} from 'recoil';
import Style from '../../../../styles/empDashJobs.module.scss';
import singleJob from '../../../../stores/atoms/job_atom.js';
import Link from 'next/link';
const EpmDashSingleInfo = ({jobTitle, candidatesCount, companyName, jobtype, type}) => {

    // const job = useRecoilValue(singleJob);

    return (
        <div className={Style.epmDashSingleInfoMain}>
            {/* <Link href={`/jobs`}><span className={Style.backToSearch}>Back to Job Search</span></Link> */}
            <div className={Style.jobInfoCard}>
                <h4>{jobTitle}</h4>
                <p>{companyName} {jobtype && <div className={Style.dot}/>} {jobtype}</p>
                {type !== "draft" && <h3>{candidatesCount || 0}</h3>}
                {(type !== "draft") && <span>Applicants</span>}
            </div>
        </div>
    )
}

export default EpmDashSingleInfo
