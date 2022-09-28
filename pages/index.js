import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Countdown from 'react-countdown';
import { zeroPad } from 'react-countdown';
import moment from 'moment';

const deadlines = [
  { milestone: "End of developement", date: "2022-11-08", colors: "bg-amber-600 text-amber-100" },
  { milestone: "Lisbon events kickoff", date: "2022-10-24", colors: "bg-pink-600 text-pink-100" },
  { milestone: "Audits kickoff", date: "2022-11-14", colors: "bg-red-600 text-red-100" },
  { milestone: "Butterfly launch", date: "2022-11-14", colors: "bg-violet-600 text-violet-100" },
  { milestone: "Buildernet launch", date: "2022-11-28", colors: "bg-cyan-600 text-cyan-100" },
  { milestone: "Calibrationnet launch", date: "2023-01-09", colors: "bg-lime-600 text-lime-100" },
  { milestone: "Mainnet", date: "2023-02-08", colors: "bg-green-600 text-green-100" },
];

const renderer = ({ days, hours, minutes, seconds, completed }) => <span className={styles.timer}>{completed ? "🎉" : `${days}d ${hours}h ${minutes}m ${zeroPad(seconds)}s`}</span>

const sortBy = (key) => {
  return (a, b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0);
};

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>FVM M2.1 launch milestones</title>
        <meta name="description" content="FVM M2.1 launch timeline" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.title}>FVM M2.1 launch timeline</div>
        {deadlines.sort(sortBy("date")).map(x =>
          <article className={`${styles.entry} ${x.colors}`}>
            <div className={styles.left}>
              <div className={styles.name}><span className={styles.nameInner}>{x.milestone}</span></div>
              <div className={styles.due}>
                <span className='text-'>due </span> {x.date}
              </div>
            </div>
            <div className={styles.right}>
              <Countdown date={x.date} className={styles.timer} renderer={renderer} />
              <div className={styles.relativeTime}>
                {moment(x.date, "YYYY-MM-DD").fromNow()}
              </div>
            </div>
          </article>)}
      </main>
    </div>
  )
}
