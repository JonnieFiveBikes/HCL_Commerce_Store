/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *==================================================
 */

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { cloneDeep } from "lodash-es";
import { useWinDimsInEM } from "./use-win-dims-in-em";
import { EMPTY_STRING, M_TABLET_W, S_MOBILE_W } from "../../constants/common";
import { useLocation, useNavigate } from "react-router";
import { COMPARE_ROUTE } from "../../constants/routes";
import { useEffect } from "react";

export const useCompare = () => {
  const { t } = useTranslation();
  const { w } = useWinDimsInEM();
  const MAX_COMPS = useMemo(() => (w < M_TABLET_W ? 3 : 4), [w]);
  const INIT_STATE = useMemo(
    () => ({
      max: MAX_COMPS,
      disabled: false,
      checked: {},
      storage: [],
      len: 0,
    }),
    [MAX_COMPS]
  );
  const [data, setData] = useState<any>(cloneDeep(INIT_STATE));
  const [seq, setSeq] = useState<number>(0);
  const location: any = useLocation();
  const navigate = useNavigate();
  const compare = useMemo(
    () => ({
      t,
      labels: {
        addTo: "compare.compare",
      },
      data,
      openCompare: () => {
        const asArray = Object.values<any>(data.checked).sort((a, b) => a.seq - b.seq);
        if (asArray.length > data.max) {
          delete data.checked[asArray[0].obj.id];
        }
        navigate(COMPARE_ROUTE, { state: { from: `${location.pathname}${location.search ?? EMPTY_STRING}`, data } });
      },
      copyFrom: (other) => {
        const entries = Object.entries(other ?? {});
        entries.forEach(([k, v], i) => {
          const { obj } = v as any;
          data.checked[k] = { seq: i, obj };
          data.storage.push(obj);
          data.len++;
        });
        data.disabled = data.len === MAX_COMPS;
        setData({ ...data });
        setSeq(seq + entries.length);
      },
      onChange: (e, ceId, obj) => {
        const c = e.target.checked;
        data.len += c ? 1 : -1;
        if (c) {
          data.checked[ceId] = { seq, obj };
          data.storage.push(obj);
          setSeq(seq + 1);
        } else {
          data.storage[data.checked[ceId].seq] = undefined;
          delete data.checked[ceId];
        }
        data.disabled = data.len === MAX_COMPS;
        setData({ ...data });
      },
      removeAll: () => {
        setData(cloneDeep(INIT_STATE));
        setSeq(0);
      },
    }),
    [MAX_COMPS, data, seq] // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    if (MAX_COMPS !== data.max) {
      // if screen size has shrunk -- delete last few items added that no longer fit in the screen
      if (data.len > MAX_COMPS) {
        data.storage
          .map((v, i) => i)
          .filter((v) => data.storage[v])
          .reverse()
          .splice(0, data.len - MAX_COMPS)
          .forEach((v) => {
            delete data.checked[data.storage[v].id];
            data.storage[v] = undefined;
          });
        data.len = MAX_COMPS;
      }

      setData({ ...data, disabled: data.len === MAX_COMPS, max: MAX_COMPS });
    }
  }, [MAX_COMPS, w]); // eslint-disable-line react-hooks/exhaustive-deps

  return { compare: w > S_MOBILE_W ? compare : null };
};
