export const VALID = { username: process.env.ORANGEHRM_USER ?? 'Admin', password: process.env.ORANGEHRM_PASS ?? 'admin123' };
export const INVALID = { username: 'baduser', password: 'badpass' };
export const SQL_INJECTION = { username: "' OR '1'='1", password: "' OR '1'='1" };
export const XSS_PAYLOAD = { username: '<script>alert(1)</script>', password: 'password' };