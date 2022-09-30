import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Countdown from 'react-countdown';
import { zeroPad } from 'react-countdown';
import moment from 'moment';

import '@fontsource/inconsolata';
import '@fontsource/inconsolata/200.css';
import '@fontsource/inconsolata/300.css';
import '@fontsource/inconsolata/400.css';
import '@fontsource/inconsolata/500.css';
import '@fontsource/inconsolata/600.css';
import '@fontsource/inconsolata/700.css';
import '@fontsource/inconsolata/800.css';
import '@fontsource/inconsolata/900.css';

const deadlines = [
  { milestone: "End of development", date: "2022-11-08", colors: "bg-amber-600 text-amber-100 hover:bg-amber-700" },
  { milestone: "Lisbon events kickoff", date: "2022-10-24", colors: "bg-pink-600 text-pink-100 hover:bg-pink-700" },
  { milestone: "Audits kickoff", date: "2022-11-14", colors: "bg-red-600 text-red-100 hover:bg-red-700" },
  { milestone: "Butterfly launch", date: "2022-11-14", colors: "bg-violet-600 text-violet-100 hover:bg-violet-700" },
  { milestone: "Buildernet launch", date: "2022-11-28", colors: "bg-sky-600 text-sky-100 hover:bg-sky-700" },
  { milestone: "Calibrationnet launch", date: "2023-01-09", colors: "bg-lime-600 text-lime-100 hover:bg-lime-700" },
  { milestone: "Mainnet", date: "2023-02-08", colors: "bg-green-600 text-green-100 hover:bg-green-700" },
];

const renderer = ({ days, hours, minutes, seconds, completed }) => <span className={styles.timer}>{completed ? "🎉" : `${days}d ${hours}h ${minutes}m ${zeroPad(seconds)}s`}</span>

const sortBy = (key) => {
  return (a, b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0);
};

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>FVM M2.1 launch timeline</title>
        <meta name="description" content="FVM M2.1 launch timeline" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.title}>FVM M2.1 launch timeline</div>
        {deadlines.sort(sortBy("date")).map(x =>
          <article key={styles.name} className={`${styles.entry} ${x.colors}`}>
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
