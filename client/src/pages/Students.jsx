
import SectionHeading from '../components/SectionHeading'
import StudentTable from '../components/StudentTable'

export default function Students() {
  return (
    <>
    <SectionHeading title="Students" buttonTitle="Student" link="/add-student"/>
    <StudentTable />
    </>
  )
}
