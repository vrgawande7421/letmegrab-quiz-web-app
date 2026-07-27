import { publicRoutes } from "./PublicRoutes"
import { routes } from "./Routes"

export const AppRoutes=()=>{
return [...publicRoutes,...routes]
}