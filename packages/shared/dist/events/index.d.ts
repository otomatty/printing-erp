import * as react from 'react';

type EmptyPayload = NonNullable<unknown>;
interface BaseAppEventTypes {
    'user.signedIn': {
        userId: string;
    };
    'user.signedUp': {
        method: `magiclink` | `password`;
    };
    'user.updated': EmptyPayload;
    'checkout.started': {
        planId: string;
        account?: string;
    };
}
type ConsumerProvidedEventTypes = EmptyPayload;
type ExtendedAppEventTypes<T extends ConsumerProvidedEventTypes = ConsumerProvidedEventTypes> = BaseAppEventTypes & T;
type AppEventType<T extends ConsumerProvidedEventTypes> = keyof ExtendedAppEventTypes<T>;
type AppEvent<T extends ConsumerProvidedEventTypes = ConsumerProvidedEventTypes, K extends AppEventType<T> = AppEventType<T>> = {
    type: K;
    payload: ExtendedAppEventTypes<T>[K];
};
type EventCallback<T extends ConsumerProvidedEventTypes, K extends AppEventType<T> = AppEventType<T>> = (event: AppEvent<T, K>) => void;
interface AppEventsContextType<T extends ConsumerProvidedEventTypes> {
    emit: <K extends AppEventType<T>>(event: AppEvent<T, K>) => void;
    on: <K extends AppEventType<T>>(eventType: K, callback: EventCallback<T, K>) => void;
    off: <K extends AppEventType<T>>(eventType: K, callback: EventCallback<T, K>) => void;
}
declare function AppEventsProvider<T extends ConsumerProvidedEventTypes = ConsumerProvidedEventTypes, K extends AppEventType<T> = AppEventType<T>>({ children }: React.PropsWithChildren): react.JSX.Element;
declare function useAppEvents<T extends ConsumerProvidedEventTypes = ConsumerProvidedEventTypes>(): AppEventsContextType<T>;

export { type AppEvent, type AppEventType, AppEventsProvider, type BaseAppEventTypes, type ConsumerProvidedEventTypes, type EventCallback, type ExtendedAppEventTypes, useAppEvents };
