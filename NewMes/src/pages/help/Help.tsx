import BulbIcon from "@assets/icons/BulbIcon";
import CallIcon from "@assets/icons/CallIcon";
import FeedIcon from "@assets/icons/FeedIcon";
import FlagIcon from "@assets/icons/FlagIcon";
import InfoIcon from "@assets/icons/InfoIcon";
import PenIcon from "@assets/icons/PenIcon";

import HelpBox from "@components/box/HelpBox";

const Help = () => {
  return (
    <section className="flex flex-col w-full h-full px-5 py-4">
      <h1 className="text-3xl font-bold p-2 text-white">Help</h1>

      <section className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] pt-4 w-full gap-4 overflow-y-auto">
        <HelpBox
          icon={<InfoIcon width={72} height={72} className="text-white" />}
          title="Getting Started"
          description="Get assistance with using the platform."
        />
        <HelpBox
          icon={<FeedIcon width={72} height={72} className="text-white" />}
          title="Community Guidelines"
          description="Understand the rules and expectations."
        />
        <HelpBox
          icon={<PenIcon width={72} height={72} className="text-white" />}
          title="Release Notes"
          description="Stay updated with the latest changes and improvements."
        />
        <HelpBox
          icon={<FlagIcon width={72} height={72} className="text-white" />}
          title="Report an Issue"
          description="Let us know if you encounter any problems."
        />
        <HelpBox
          icon={<CallIcon width={72} height={72} className="text-white" />}
          title="Contact Support"
          description="Reach out for personalized help."
        />
        <HelpBox
          icon={<BulbIcon width={72} height={72} className="text-white" />}
          title="Tips & Tricks"
          description="Learn how to make the most of the platform."
        />
      </section>

      <footer className="mb-2">
        <p className="font-pre-regular text-xs text-center text-icon"></p>
      </footer>
    </section>
  );
};

export default Help;
