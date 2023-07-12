import { redQuery } from '@/core/red-query/red-query.lib'

export class StatisticService {
  #BASE_URL = '/statistics'

  info(onSuccess) {
    return redQuery({
      path: this.#BASE_URL,
      onSuccess
    })
  }
}
