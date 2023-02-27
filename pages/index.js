import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { zeroPad } from 'react-countdown';
import dynamic from 'next/dynamic'
import moment from 'moment';

const Countdown = dynamic(() => import('react-countdown'), {
  ssr: false
})

const deadlines = [
  { milestone: "End of development", date: "2022-12-06", colors: "bg-slate-800 text-slate-100 hover:text-amber-100 hover:bg-amber-600", c: "bg-amber-600/50" },
  { milestone: "Lisbon events kickoff", date: "2022-10-24", colors: "bg-slate-800 text-slate-100 hover:text-pink-100 hover:bg-pink-600", c: "bg-pink-600/50" },
  { milestone: "Audits kickoff", date: "2022-11-22", colors: "bg-slate-800 text-slate-100 hover:text-red-100 hover:bg-red-600", c: "bg-red-600/50" },
  { milestone: "Hyperspace testnet", date: "2022-01-20", colors: "bg-slate-800 text-slate-100 hover:text-sky-100 hover:bg-sky-600", c: "bg-sky-600/50" },
  { milestone: "Calibrationnet upgrade", date: "2023-02-21", colors: "bg-slate-800 text-slate-100 hover:text-lime-100 hover:bg-lime-600", c: "bg-lime-600/50" },
  { milestone: "Mainnet", date: "2023-03-14", colors: "bg-slate-800 text-slate-100 hover:text-green-100 hover:bg-green-600", c: "bg-green-600/50" },
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
          <article key={x.milestone} className={`${styles.entry} ${x.colors} group`}>
            <div className={styles.left}>
              <div className={styles.name}><span className={`${styles.nameInner} ${x.c} group-hover:bg-zinc-800/30`}>{x.milestone}</span></div>
              <div className={styles.due}>
                <span className='text-'>due </span> {x.date}
              </div>
            </div>
            <div className={styles.right}>
              <Countdown date={x.date} className={styles.timer} renderer={renderer} />
              <div className={styles.relativeTime}>
                ～ {moment(x.date, "YYYY-MM-DD").fromNow()}
              </div>
            </div>
          </article>)}
      </main>
    </div>
  )
}
