'use client';
import ItinaryCards from './itinaryCards';
import WeekendGetaways from './weekendGetaways';

interface PageProp {
  params: {
    state: string;
  };
}
const Page = ({ params }: PageProp) => {
  return (
    <div className="">
      <ItinaryCards state={params.state} />
      <WeekendGetaways state={params.state} />
    </div>
  );
};

export default Page;
