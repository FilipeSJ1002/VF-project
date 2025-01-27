"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpiredTokenException = void 0;
const common_1 = require("@nestjs/common");
class ExpiredTokenException extends common_1.UnauthorizedException {
    constructor(message) {
        super(message || 'O token expirou. Por favor, faça login novamente.');
    }
}
exports.ExpiredTokenException = ExpiredTokenException;
//# sourceMappingURL=expired-token.exception.js.map