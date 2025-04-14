import * as react from 'react';

declare function PersonalAccountSettingsContainer(props: React.PropsWithChildren<{
    userId: string;
    features: {
        enableAccountDeletion: boolean;
        enablePasswordUpdate: boolean;
    };
    paths: {
        callback: string;
    };
}>): react.JSX.Element;

export { PersonalAccountSettingsContainer };
