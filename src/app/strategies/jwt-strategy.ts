import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../../../constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'tai')
{
    constructor()
    {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        })
    }

    async validate(payload:any){
        return {id:payload.sub.id, email:payload.email, status:payload.status}
    }
}