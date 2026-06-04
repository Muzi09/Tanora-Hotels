import MaterialIcon from "@/components/ui/MaterialIcon";

const ACCOMMODATIONS = [
  { label: "Executive Suites", count: 3 },
  { label: "Balcony Room", count: 1 },
  { label: "Twin Rooms", count: 3 },
  { label: "King Rooms", count: 16 },
];

const DINING_FEATURES = [
  "4th Floor PDR (10-12 cap) with private washroom",
  "4th Floor PDR (6-8 cap)",
  "Grand Banquet Hall",
];

export default function EstateGlance() {
  return (
    <section className="py-24 md:py-32 bg-surface border-t border-secondary/10">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-16 reveal">
          <span className="text-secondary font-label-sm uppercase tracking-[0.2em] mb-4 block">
            Infrastructure
          </span>
          <h3 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">
            The Estate at a Glance
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 reveal">
          {/* Accommodations */}
          <div className="p-8 bg-surface-container-low border border-secondary/10 rounded-sm hover:border-secondary transition-colors">
            <div className="flex items-center gap-4 mb-6">
              <MaterialIcon
                name="hotel"
                className="text-primary text-[32px]"
              />
              <h4 className="font-headline-md text-primary">
                23 Refined Sanctuaries
              </h4>
            </div>
            <ul className="space-y-3 text-on-surface-variant text-body-md">
              {ACCOMMODATIONS.map((item) => (
                <li
                  key={item.label}
                  className="flex justify-between"
                >
                  <span>{item.label}</span>
                  <span className="font-bold">{item.count}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Gastronomy */}
          <div className="p-8 bg-surface-container-low border border-secondary/10 rounded-sm hover:border-secondary transition-colors">
            <div className="flex items-center gap-4 mb-6">
              <MaterialIcon
                name="restaurant_menu"
                className="text-primary text-[32px]"
              />
              <h4 className="font-headline-md text-primary">
                Dual Gastronomy
              </h4>
            </div>
            <p className="text-on-surface-variant text-body-md mb-4">
              Rooftop Restaurant &amp; Bar and Ground Floor Bistro.
            </p>
            <div className="pt-4 border-t border-secondary/10">
              <span className="text-label-sm uppercase tracking-widest text-secondary">
                Total Seating Capacity: 100
              </span>
            </div>
          </div>

          {/* Business & Events */}
          <div className="p-8 bg-surface-container-low border border-secondary/10 rounded-sm hover:border-secondary transition-colors">
            <div className="flex items-center gap-4 mb-6">
              <MaterialIcon
                name="meeting_room"
                className="text-primary text-[32px]"
              />
              <h4 className="font-headline-md text-primary">
                Private Dining &amp; Events
              </h4>
            </div>
            <ul className="space-y-3 text-on-surface-variant text-body-md">
              {DINING_FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <MaterialIcon
                    name="check_circle"
                    className="text-sm mt-1"
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Arrival */}
          <div className="p-8 bg-surface-container-low border border-secondary/10 rounded-sm hover:border-secondary transition-colors lg:col-span-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <MaterialIcon
                  name="directions_car"
                  className="text-primary text-[32px]"
                />
                <h4 className="font-headline-md text-primary">
                  Seamless Arrival
                </h4>
              </div>
              <p className="text-on-surface-variant text-body-md">
                Dedicated Driveway for Valet Parking ensuring a smooth
                transition from the city to our sanctuary.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
