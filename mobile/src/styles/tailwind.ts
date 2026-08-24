import { create } from 'twrnc';

// Create custom Tailwind instance with SQUI theme tokens
const tw = create(require('../../tailwind.config.js'));

export default tw;
export { tw };
