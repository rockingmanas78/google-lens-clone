import { ImageItem } from '../components/ImageSearchResults/types';

export type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    SearchResults: { query?: string, fromSheet: boolean | false, results: ImageItem[] | [], imageQuery: string | null };
    LensCapture: undefined;
    LensResults: { imageUri?: string };
    LensSearch: undefined;
    SearchSuggestions: undefined;
    VoiceSearch: undefined;
};