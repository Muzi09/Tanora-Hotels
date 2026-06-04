import MaterialIcon from "@/components/ui/MaterialIcon";

type DiningItemProps = {
  title: string;
  icon: string;
  description: string;
};

/**
 * A single row in the dining list — title on the left, an icon that fades
 * in on hover on the right, and a small caption underneath. The bottom
 * border changes from white/10 to secondary-fixed on hover.
 */
export default function DiningItem({
  title,
  icon,
  description,
}: DiningItemProps) {
  return (
    <div className="group cursor-pointer border-b border-white/10 pb-6 hover:border-secondary-fixed transition-colors">
      <div className="flex justify-between items-center mb-2">
        <h5 className="text-headline-md font-headline-md group-hover:text-secondary-fixed transition-colors">
          {title}
        </h5>
        <MaterialIcon
          name={icon}
          className="text-secondary-fixed opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </div>
      <p className="text-white/50 text-label-sm uppercase tracking-widest">
        {description}
      </p>
    </div>
  );
}
