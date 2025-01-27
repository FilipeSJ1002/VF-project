"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidPasswordException = void 0;
const common_1 = require("@nestjs/common");
class InvalidPasswordException extends common_1.UnauthorizedException {
    constructor(message = 'Senha inválida!') {
        super(message);
    }
}
exports.InvalidPasswordException = InvalidPasswordException;
//# sourceMappingURL=invalid-password.exception.js.map