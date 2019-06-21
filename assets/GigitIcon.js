import { createIconSet } from '@expo/vector-icons';

const glyphMap = {
    "work": 57345,
    "tasks": 57346,
    "actors": 57347,
    "forecast": 57354,
    "revisions": 57355,
    "news": 57359,
    "skills": 57360,
    "calendar": 57362,
    "loading": 57363,
    "email": 57364,
    "phone": 57365,
    "chat": 57366,
    "video": 57367,
    "text-sms": 57368,
    "pencil": 57370,
    "adjust": 57371,
    "wrench": 57372,
    "user-follow": 57373,
    "user-connect": 57374,
    "user-message": 57375,
    "question-fore": 57376,
    "question-back": 57369,
    "info-fore": 57377,
    "info-back": 57378,
    "pin-1": 57387,
    "key-secure-3": 57388,
    "filter-3": 57356,
    "close-button-2": 57348,
    "minus-button-3": 57349,
    "attention-1": 57350,
    "add-button-3": 57351,
    "close-off-5": 57352,
    "check-5": 57344,
    "list": 57353,
    "ideas": 57357,
    "campfire": 57358,
    "learn": 57361,
    "connect": 57380,
    "fire-1": 57389,
    "fire-2": 57390,
    "fire-3": 57391,
    "rocket": 57392,
    "search": 57379,
    "followers": 57381,
    "speaker": 57382,
    "thoughts": 57383,
    "market": 57384,
    "torch": 57385,
    "spark": 57386,
}

export const GigItIcon = createIconSet(glyphMap, 'gigit', require('./fonts/gigit.ttf'));

export const Button = GigItIcon.Button;
export const TabBarItem = GigItIcon.TabBarItem;
export const TabBarItemIOS = GigItIcon.TabBarItemIOS;
export const ToolbarAndroid = GigItIcon.ToolbarAndroid;
export const getImageSource = GigItIcon.getImageSource;