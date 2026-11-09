import { Link } from 'react-router-dom'
import { BOTTLE_RETURN_CREDIT, BRAND_NAME, formatPrice } from '../config'
import { PageHeading } from '../components/PageHeading'

const sections = [
  {
    title: 'Why raw',
    body: 'Most bottled juice is heated or pressure-treated so it can sit on a shelf for weeks. Ours is cold-pressed and never heated, so it tastes like the produce it came from. That also means it only lasts a few days, which is why we press right before each market and sell it face to face.',
  },
  {
    title: 'Why glass',
    body: "Glass keeps the taste clean and doesn't end up in a landfill after one use. We wash, sanitize and refill every bottle that comes back.",
  },
  {
    title: 'Why local',
    body: 'We buy from farms you can drive to and put their names on the label. When the season changes, the menu changes with it.',
  },
]

export default function Story() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <PageHeading title="Our story">
        {BRAND_NAME} started behind a farmers market table in Orange County, pressing juice for neighbors who read
        labels and want to know where their food comes from.
      </PageHeading>

      <div className="space-y-10">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="text-2xl font-extrabold text-leaf-dark">{s.title}</h2>
            <p className="mt-2 text-lg leading-relaxed">{s.body}</p>
          </section>
        ))}

        <section className="rounded-2xl bg-mint p-6">
          <h2 className="text-2xl font-extrabold text-leaf-dark">How bottle returns work</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-lg">
            <li>Rinse your glass bottle when you're done.</li>
            <li>Bring it to any market or leave it out for delivery.</li>
            <li>
              Get {formatPrice(BOTTLE_RETURN_CREDIT)} off your next juice: {formatPrice(12 - BOTTLE_RETURN_CREDIT)} instead of
              $12.
            </li>
          </ol>
        </section>

        <Link to="/markets" className="inline-block rounded-full bg-leaf px-6 py-3 font-bold text-white hover:bg-leaf-dark">
          Find a market
        </Link>
      </div>
    </div>
  )
}
